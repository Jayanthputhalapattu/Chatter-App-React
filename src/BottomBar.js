import axios from "axios";
import React, { useState, useContext } from "react";
import { RespContext } from "./context/RespContext";
const BottomBar = () => {
  const [content, setContent] = useState({
    name: "",
    message: ""
  });
  const [response, setResponse] = useState([]);
  const Resp = useContext(RespContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://u6o0u.sse.codesandbox.io/message", {
        name: content.name,
        content: content.message
      })
      .then((resp) => {
        Resp.setChat([...Resp.chat, resp.data]);
      });
    setContent({ name: content.name, message: "" });
  };

  return (
    <div>
      <form className="fort" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) =>
            setContent({ name: e.target.value, message: content.message })
          }
          value={content.name}
          style={{ width: window.innerWidth / 2 }}
        />
        <input
          type="text"
          placeholder="Enter message to be sent ..."
          style={{ width: window.innerWidth / 2 }}
          onChange={(e) =>
            setContent({ name: content.name, message: e.target.value })
          }
          value={content.message}
        />
        <input type="submit" value="send" style={{ display: "none" }} />
      </form>
    </div>
  );
};
export default BottomBar;
