import axios from "axios";
import React, { useState, useContext } from "react";
import { RespContext } from "./context/RespContext";
const BottomBar = () => {
  // const [response, setResponse] = useState([]);
  const Resp = useContext(RespContext);
  // console.log(Resp);
  const [content, setContent] = useState({
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://u6o0u.sse.codesandbox.io/message", {
        name: Resp.name,
        content: content.message
      })
      .then((resp) => {
        Resp.setChat([...Resp.chat, resp.data]);
      });
    setContent({ message: "" });
  };
  return (
    <div>
      <form className="fort" onSubmit={handleSubmit}>
        {/* <input
          type="text"
          placeholder="Your name"
          onChange={(e) =>
            setContent({ name: e.target.value, message: content.message })
          }
          value={content.name}
          style={{ width: window.innerWidth / 2 }}
        /> */}
        <input
          type="text"
          placeholder="Enter message to be sent ..."
          style={{ width: window.innerWidth / 2 }}
          onChange={(e) => setContent({ message: e.target.value })}
          value={content.message}
        />
        <input type="submit" value="send" style={{ display: "none" }} />
      </form>
    </div>
  );
};
export default BottomBar;
