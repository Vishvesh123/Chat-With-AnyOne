import React, { useEffect, useState } from "react";
import { db, firestore } from "../firebase";
import {
  where,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

class Chat extends React.Component {
  componentDidMount() {
    this.unsubscribe = firestore
      .collection("chat")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.props.setData(fetchedData);
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    try {
      const collectionRef = firestore.collection("chat");
      collectionRef.add({
        text: this.props.message,
        timestamp: new Date(),
        room: JSON.parse(localStorage.getItem("myRoom")),
        name: JSON.parse(localStorage.getItem("myName")),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
    this.props.setMessage("");
  };

  render() {
    const { data } = this.props;
    const roomNo = JSON.parse(localStorage.getItem("myRoom"));

    return (
      <div className="Chat">
      <div className="Scrolling-content">
      
        <div className="myMessages">
          {data.map((item) => {
            if (item.room === roomNo) {
              return (
                <div key={item.id}>
                  <span
                    style={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Source Code Pro",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.name}----{" "}
                  </span>
                  {item.text}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="input-group mb-3">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.props.message}
              onChange={(e) => this.props.setMessage(e.target.value)}
              style={{ backgroundColor: "#ffffff", color: "green" }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "Highlight",
                borderRadius: "5px",
                color: "black",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
       
      </div>
    );
  }
}

export function ChatWithState(props) {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const messagesRef = collection(db, "chat");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", JSON.parse(localStorage.getItem("myRoom"))),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setData(messages);
    });

    return () => unsubscribe();
  });

  return (
    <Chat
      message={message}
      setMessage={setMessage}
      data={data}
      setData={setData}
      messagesRef={messagesRef}
    />
  );
}

export default Chat;
