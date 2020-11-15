import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import BottomBar from "./BottomBar";
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css";
import { RespContext } from "./context/RespContext";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import config from "./firebaseconfig";
var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(config);
const App = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.get("https://u6o0u.sse.codesandbox.io/message").then((resp) => {
      setChat(resp.data);
    });
    window.scrollTo(0, window.innerHeight);
  });

  const firebaseAuth = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
        console.log(token);
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
      });
  };
  return (
    <RespContext.Provider value={{ chat, setChat }}>
      <Container fluid>
        {/* <Resp /> */}
        <Row>
          <Button style={{}} onClick={firebaseAuth}>
            <FaGoogle
              style={{ paddingBottom: 2, paddingRight: 5, fontSize: 20 }}
            />
            SIGN IN WITH GOOGLE
          </Button>
        </Row>
        <Row>
          <Col style={{ marginTop: 15 }}>
            <BottomBar />
          </Col>
        </Row>
      </Container>
      <div></div>
    </RespContext.Provider>
  );
};
export default App;
