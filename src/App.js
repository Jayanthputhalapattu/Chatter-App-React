import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import BottomBar from "./BottomBar";

import "./App.css";
import { RespContext } from "./context/RespContext";
import axios from "axios";
const App = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.get("https://u6o0u.sse.codesandbox.io/message").then((resp) => {
      setChat(resp.data);
    });
  });
  return (
    <RespContext.Provider value={{ chat, setChat }}>
      <div className="App">
        {chat.map((res, index) => (
          <div className="message-box">
            <ul style={{ listStyleType: "none" }}>
              <li style={{ fontSize: 13 }}>{res.name}</li>
              <li style={{ fontSize: 22, paddingLeft: 20 }}>{res.content}</li>
            </ul>
          </div>
        ))}
        <BottomBar />
      </div>
    </RespContext.Provider>
  );
};
export default App;
