import React from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

class Login extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent" + error);
      });
  };
  onSubmitOTP = (e) => {
    e.preventDefault();

    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
        // this.props.setVerify(true);
        localStorage.setItem("isVerified", JSON.stringify(true));
        localStorage.setItem("myItem", JSON.stringify(this.state.mobile));
        this.props.navigate("/left");
        console.log(localStorage.getItem("isVerified"));
        console.log(localStorage.getItem("myItem"));
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  render() {
    return (
      <body className="loginBox w-25 h-50">
        <div className="main row">
          <h2>Verify With your Phone Number</h2>

          <form onSubmit={this.onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              maxlength="13"
              required
              onChange={this.handleChange}
              name="mobile"
            />
            <button type="submit" className="m-2 p-2 btn btn-outline-info">
              Send OTP
            </button>
          </form>
        </div>
        <div className="row">
          <form onSubmit={this.onSubmitOTP} className="OTP">
            <h4>Enter your otp</h4>
            <input
              type="text"
              maxlength="6"
              // onkeyup="clickEvent(this,'sec')"
              onChange={this.handleChange}
              name="otp"
              placeholder="Enter OTP"
            />

            <button type="submit" className="m-3 p-2  btn btn-outline-success">
              VERIFY
            </button>
          </form>
        </div>
      </body>
    );
  }
}

export function LoginWithNavigation(props) {
  const navigate = useNavigate();
  const [isVerify, setVerify] = useState(false);
  return (
    <Login
      navigate={navigate}
      isVerify={isVerify}
      setVerify={setVerify}
    ></Login>
  );
}

export default Login;
