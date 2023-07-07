import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";
import firebase from '../firebase';
import 'firebase/auth';

function Logout(){

  useEffect(() => {
    
    localStorage.setItem("isVerified", JSON.stringify(false));
    
    // Perform any additional actions specific to the Logout page
    const isLogout=window.location.pathname;
    try {
       firebase.auth().signOut();
      // Redirect to the login or home page after logout
      // You can use React Router or any other method for navigation
      // Example: history.push('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
    console.log(isLogout);
    if(isLogout==="/logout"){
      navigate("/left");
      window.location.reload();
    }
  }, );
  const navigate=useNavigate();
  

  return(<div>
     
  </div>)
}
export default Logout;