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
  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  const firebaseAuth = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;

        var csrfToken = getCookie("csrfToken");
        var idToken;
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((resp) => {
            console.log(resp);
            idToken = resp;
          });
        axios.post(
          "https://oc62v.sse.codesandbox.io/sessionLogin",
          {
            idToken: idToken,
            csrfToken: csrfToken
          },
          { withCredentials: true }
        );
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
