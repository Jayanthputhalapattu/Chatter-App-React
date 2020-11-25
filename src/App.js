import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RespContext } from "./context/RespContext";
import config from "./firebaseconfig";
import firebase from "firebase/app";
import "firebase/auth";
import ChatComp from "./Components/ChatComp";
// axios.defaults.withCredentials = true;

firebase.initializeApp(config);

const App = () => {
  const [chat, setChat] = useState([]);
  const [name, SetName] = useState("");
  return (
    <RespContext.Provider value={{ chat, setChat, name, SetName }}>
         <ChatComp/>
    </RespContext.Provider>
  );
};
export default App;
