import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import BottomBar from "./BottomBar";

import "./App.css";
import { RespContext } from "./context/RespContext";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
const App = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.get("https://u6o0u.sse.codesandbox.io/message").then((resp) => {
      setChat(resp.data);
    });
    window.scrollTo(0, window.innerHeight);
  });

  return (
    <RespContext.Provider value={{ chat, setChat }}>
      <Container className="App" fluid>
        <Row>
          <ul style={{ listStyleType: "none" }}>
            {chat.map((res, index) => (
              <div className="message-box">
                <li
                  style={{
                    fontSize: 13,
                    color: "#2B2B52",
                    paddingLeft: 20,
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold"
                  }}
                >
                  {res.name}
                </li>
                <li
                  style={{
                    fontSize: 15,
                    paddingLeft: 20,
                    fontFamily: "Montserrat, sans-serif",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  {res.content}
                </li>
              </div>
            ))}
          </ul>
        </Row>
      </Container>
      <Container fluid>
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
