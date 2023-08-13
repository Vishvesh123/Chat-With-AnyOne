import React, { useState } from "react";
import "../components/css/room.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Room() {
  const [roomNo, setRoomNo] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoomNoChange = (e) => {
    setRoomNo(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    if (roomNo && name) {
      localStorage.setItem("myRoom", JSON.stringify(roomNo));
      localStorage.setItem("myName", JSON.stringify(name));
      navigate("/chat");
    } else {
      toast.info("Enter the all values");
    }
  };

  return (
    <div className="Room">
      <div className="roomInside">
        <input
          type="number"
          alt="room"
          maxLength="6"
          value={roomNo}
          name="room"
          placeholder="Enter room no"
          onChange={handleRoomNoChange}
          required
        />
        <input
          type="text"
          alt="name"
          placeholder="Enter your name"
          value={name}
          name="Myname"
          onChange={handleNameChange}
          required
        />

        <button
          type="submit"
          // className="m-3 p-2 btn btn-success"
          onClick={handleClick}
        >
          Chat
        </button>
      </div>
    </div>
  );
}

export default Room;
