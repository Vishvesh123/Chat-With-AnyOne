import React from "react";

import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import Logo from "./logo.png"

import {RiChat4Fill,RiLogoutBoxFill,RiShieldUserFill,RiLoginBoxFill} from "react-icons/ri"





function Left(props) {
  return (
    <div className="leftSide">
    
      <Sidebar style={{ height: "100%", position: "absolute",}}>
        <Menu>
        <br/>
       

       
        <img src={Logo} alt="" width="25%"/>
        
       
        {JSON.parse(localStorage.getItem('isVerified')) ? (
              <>
              
              <h5><RiShieldUserFill/> {JSON.parse(localStorage.getItem('myItem'))}</h5>
        
              <br/>
              <MenuItem icon ={<RiChat4Fill/>} component={<Link to="/room">Chat</Link>}>Chat</MenuItem>
                <br />
              </>
            ) : (
              null
            )}
    
          <MenuItem
            icon={<RiLoginBoxFill />}
            component={<Link to="/login">Login</Link>}
          >Login
           
          </MenuItem>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          
         
          
          {JSON.parse(localStorage.getItem('isVerified')) ? (
              <>
              
              <MenuItem icon={<RiLogoutBoxFill/>} component={<Link to="/logout">Logout</Link>}>Logout</MenuItem>
             
                <br />
              </>
            ) : (
              null
            )}
         
         
         
            
         
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Left;
