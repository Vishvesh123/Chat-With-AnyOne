import React from "react";

import Left from "./Left";
import  { LoginWithNavigation } from "./Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Logout from "./Logout";

import  { RoomWithState } from "./Room";
import { ChatWithState } from "./Chat";

function App() {
  return (
      <BrowserRouter>
            <Left />
            <Routes>
            <Route path="/left" element={<Left  />} />
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/login" element={<LoginWithNavigation />} />
            <Route path="/room"  element={<RoomWithState/>}/>
            <Route path="/chat"  element={<ChatWithState/>}/>
            </Routes>
      </BrowserRouter> 
  );
}
export default App;
