import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import firebase from "./services/firebase";
import "./App.css";

const App = () => {
  const [user, setuser] = useState();
  const [email, setEmail] = useState();
  const [password, setPasswrod] = useState();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput = () => {
    //clear all  input for new entry
    setEmail("");
    setPasswrod("");
  };

  const clearError = () => {
    //clear all the errors
    setEmailError("");
    setPasswordError("");
  };

  //sign in handle funtion 
  const handleSignIn = async() => {
    clearError();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/email-already-exists":
          //setting error for the email address
          setEmailError(e.message);
          // console.log(e.message)
          break;
        case "auth/invalid-password":
        case "auth/wrong-password":
          //setting error for the password
          setPasswordError(e.message);
          break;
          default:
            // console.log(e)
      }
    }
  };

  const handleSignUp = async() => {
    //reset the error
    clearError();
    try {
      //creating user using firebase 
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      // console.log(e.message)
      switch (e.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/argument-error":
        case "auth/email-already-in-use":
          //set Email error
          setEmailError(e.message);
          // console.log(e.message)
          break;
        case "auth/invalid-password":
        case "auth/wrong-password":
          case "auth/weak-password":
            //set password error
          setPasswordError(e.message);
          break;
          default:
            // console.log(e)

      }
    }
  };

  const handleLogout = () => {
    //sing out the user
    firebase.auth().signOut();
  };

  const authListner = () => {
    //checking if user is there
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setuser(user);
      } else {
        setuser(null);
      }
    });
  };

  useEffect(() => {
    authListner();
  }, []);
  return (
    <div className="App">
      {user ? (
        <div className="main">
        <Main handleLogout={handleLogout} user={user} />
        </div>
      ) : (
        <div className="landing">
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPasswrod={setPasswrod}
          emailError={emailError}
          passwordError={passwordError}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
        />
        </div>
      )}
    </div>
  );
};

export default App;
