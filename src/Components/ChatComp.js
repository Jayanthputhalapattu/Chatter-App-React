import axios from "axios";
import React,{useContext,useState,useEffect} from "react"
import firebase from "firebase/app";
import "firebase/auth";
import BottomBar from "../Components/BottomBar";
import { FaGoogle } from "react-icons/fa";
import { RespContext } from "../context/RespContext";
import { Container, Row, Col, Button} from "reactstrap";
import Resp from "../Resp";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap'
import { Redirect } from "react-router-dom";
const ChatComp = ()=>{

    const Respo = useContext(RespContext);
    const [loading,setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
useEffect(() => {
        axios
          .post(
            "https://festive-boyd-cdea89.netlify.app/.netlify/functions/server/backend/profile",
            { session: getCookie("session") },
            {
              headers: { "Access-Control-Allow-Origin": "*" },
              xhrField: { withCredentials: true }
            }
          )
          .then((resp) => {
            if (resp.status === 200) {
              Respo.SetName(resp.data.name);
            }
            setLoading(false);
          });
          // eslint-disable-next-line
        },[]);
    function deleteAllCookies() {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
  }
  const toggle = () => setIsOpen(!isOpen);
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    
      
      useEffect(() => {
        axios.get("https://festive-boyd-cdea89.netlify.app/.netlify/functions/server/message").then((resp) => {
        Respo.setChat(resp.data);
        
       });
       window.scrollTo(0, window.innerHeight);
      })
      function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      var provider = new firebase.auth.GoogleAuthProvider();
      const firebaseAuth = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            var user = result.user;
            Respo.SetName(user.displayName);
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then((idToken) => {
                axios(
                  {
                    method: "post",
                    url: "https://festive-boyd-cdea89.netlify.app/.netlify/functions/server/backend/sessionLogin",
                    data: { idToken: idToken },
                    headers: { "Access-Control-Allow-Origin": "*" }
                  },
                  { withCredentials: true }
                ).then((resp) => {
                  setCookie("session", resp.data.session, 1);
                });
              })
              .catch((error) => console.log(error));
          });
      };
      const handleLogout = ()=>{
        
        localStorage.clear();
        deleteAllCookies()
        Respo.SetName("")
        return <Redirect to="/"/>
      }
   return (
    <Container fluid>

    {loading ? (
      <p style={{ color: "white" }}>Loading....</p>
    ) : (
      <>
      <Navbar color="light" light expand="md" style={{borderRadius:"8px 8px"}}>
        
        <NavbarBrand href="/"><img src="icon-192x192.png" height="30" alt="#"/>Gaggles Chat</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/* A group chat Application */}
            </NavItem>
          </Nav>
          <NavbarText>{Respo.name==="" || Respo.name===undefined?(<>HOLA!</>):(<><Button onClick={handleLogout}>Log out</Button></>)}</NavbarText>
     
        </Collapse>
      </Navbar>
        {Respo.name === undefined || Respo.name==="" ? (
          <>
            <Row>
              <Col>
                <Button
                  style={{
                    backgroundColor: "blue",
                    display: "block",
                    margin: "auto",
                    border: "none",
                    top:300,
                    position:"relative"
                  }}
                  onClick={firebaseAuth}
                >
                  <FaGoogle
                    style={{
                      paddingBottom: 2,
                      paddingRight: 5,
                      fontSize: 20
                    }}
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
      </>
    )}
  </Container>
   )
}

export default ChatComp