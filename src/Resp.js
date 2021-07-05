import React, { useContext} from "react";
import { Container, Row } from "reactstrap";
import { RespContext } from "./context/RespContext";

const Resp = () => {
  const Resp = useContext(RespContext);
  
  return (
  
    <Container className="App" fluid>
      <Row className="msg" id ="mssg">
     
        <ul style={{ listStyleType: "none" }}>
          {Resp.chat.map((res, index) => (
            
            <div className="message-box" id="msg" key={res._id}>
              <span
                style={{
                  right: 15,
                  color: "#D4EFDF",
                  position: "absolute",
                  fontSize: 13
                }}
              >
                {new Date(res.createdAt)
                  .toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata"
                  })
                  .substr(11)}
              </span>
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

  );
};
export default Resp;
