import React, { useEffect, useState } from "react";
import "../components/css/chat.css";
import { db, firestore } from "../firebase";
import {
  where,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Chat() {
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

  useEffect(() => {
    const unsubscribe = firestore
      .collection("chat")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(fetchedData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      try {
        const collectionRef = firestore.collection("chat");
        collectionRef.add({
          text: message,
          timestamp: new Date(),
          room: JSON.parse(localStorage.getItem("myRoom")),
          name: JSON.parse(localStorage.getItem("myName")),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setMessage("");
    }
  };

  const roomNo = JSON.parse(localStorage.getItem("myRoom"));

  return (
    <div className="Chat">
      <div className="Scrolling-content">
        <div className="myMessages">
          {data.map((item) => {
            if (item.room === roomNo) {
              return (
                <div key={item.id} className="messages">
                  <span
                    style={{
                      color: "#FF52A2",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Mate SC",
                      textTransform: "capitalize",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.name}---- &nbsp;{" "}
                  </span>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "18px",

                      fontFamily: "Dancing Script",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type message here..."
            />
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
