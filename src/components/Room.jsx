import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

class Room extends React.Component {
  handleRoomNoChange = (e) => {
    this.props.setRoomNo(e.target.value);
  };
  handleNameChange =(e)=>{
    this.props.setName(e.target.value);
  }
  constructor(props) {
    super(props);
    this.handleRoomNoChange = this.handleRoomNoChange.bind(this);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleChatLinkClick = () => {
    localStorage.setItem("myRoom", JSON.stringify(this.props.roomNo));
    localStorage.setItem("myName", JSON.stringify(this.props.name));
   
  };

  render() {
    return (
      <div className="Room">
        <div className="roomInside">
          <h3>Enter Room No :</h3>
          <input
            type="number"
            alt="room"
            maxLength="6"
            value={this.props.roomNo}
            name="room"
            onChange={this.handleRoomNoChange}
            required
          />
         <input
            type="text"
            alt="name"
           placeholder="Enter your name"
            value={this.props.name}
            name="Myname"
            onChange={this.handleNameChange}
            required
          />
         
          <button
            type="submit"
            className="m-3 p-2 btn btn-success"
            onClick={this.handleChatLinkClick}
          >
            <Link to="/chat" className="chatLink">
              Chat
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
export function RoomWithState(props) {
  useEffect(()=>{
    localStorage.setItem("isVerified", JSON.stringify(true));
    
  
  });
 
  const [roomNo, setRoomNo] = useState("");
  const [name,setName]=useState("");
  return <Room roomNo={roomNo} setRoomNo={setRoomNo} name={name} setName={setName} />;
}
export default Room;
