import React, { useState, useEffect, useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import BottomBar from "./BottomBar";
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css";
import { RespContext } from "./context/RespContext";
import { Container, Row, Col, Button } from "reactstrap";
import config from "./firebaseconfig";
import Resp from "./Resp";
import { CodeSharp } from "@material-ui/icons";
import axios from "axios";
var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(config);

const App = () => {
  const [chat, setChat] = useState([]);
  const [name, SetName] = useState("");

  useEffect(() => {
    axios.get("https://u6o0u.sse.codesandbox.io/message").then((resp) => {
      setChat(resp.data);
    });
    window.scrollTo(0, window.innerHeight);
  });
  useEffect(() => {
    if (localStorage.getItem("name")) {
      SetName(localStorage.getItem("name"));
    }
  }, []);
  const firebaseAuth = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Get the user's ID token as it is needed to exchange for a session cookie.
        // var idToken = user.credential.accessToken;
        var user = result.user;
        SetName(user.displayName);
        localStorage.setItem("name", user.displayName);
      });
  };

  return (
    <RespContext.Provider value={{ chat, setChat, name, SetName }}>
      <Container fluid>
        {/* <Resp /> */}
        {name === "" ? (
          <>
            <Row>
              <Col>
                <Button
                  style={{
                    backgroundColor: "blue",
                    display: "block",
                    margin: "auto",
                    border: "none"
                    // position: "absolute"
                  }}
                  onClick={firebaseAuth}
                >
                  <FaGoogle
                    style={{ paddingBottom: 2, paddingRight: 5, fontSize: 20 }}
                  />
                  SIGN IN WITH GOOGLE
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Resp />
            <Row>
              <Col style={{ marginTop: 15 }}>
                <BottomBar />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <div></div>
    </RespContext.Provider>
  );
};
export default App;
