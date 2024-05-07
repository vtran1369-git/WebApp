import { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../Form.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import authService_admin from "../api/auth.service_admin";
import ConvertBlobToImage from "./ConvertBlobToImage"
import GetcurentDate from "./GetCurrentDate"

function App(props) {
//passing setOpID set state from NewAgitator to update the OpID state variable
  const setID = props.funct;
  const setDate = props.setDateFunct;
  const role = props.role
  const setStatus = props.funct2

  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [signature, setSignature] = useState(null)
  const [show, setShow] = useState(false);
  const [successLogin, SetSuccessLogin] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  // const [opDate, setDate] = useState(null)
 
  useEffect(() => {
    console.log("running effect in Modal.js")
  },[]) 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
/* 
  if (role === "Final QA"){
    setStatus("COMPLETED")
  }else{
    setStatus("EDIT")
  } */
  console.log("role: ", role)
  
  /* switch(role) {
    case "Tech":
      console.log("tech signed off")
      setStatus("Tech Signed OFF")
      break;
    case "QA":
      console.log("QA signed off")
      setStatus("QA Signed OFF")
      break;
    case "Final QA":
      console.log("FinalQA signed off")
      setStatus("Final QA Signed OFF")
      break;
    case "Admin":
      console.log("Admin signed off")
      setStatus("Admin Signed OFF")
      break;
    default:
      setStatus("")
  }
 */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modal userData ",userData);

    authService_admin.login(userData.username, userData.password).then(
      (data) => {
       /*  alert("login successful!")
        console.log("peopleID: " + data.id);
        console.log("signature: ")
        console.log(data.signature); */
        /* SetSuccessLogin(true)
        setSignature(ConvertBlobToImage(data.signature))
        setDate(GetcurentDate) */
        console.log("ID: ", data.id)
        // setID(data.id) //update OpID in NewAgitator.js
        setShow(false)
        console.log("pass role value: ", role)
        if(role==="QA"){
          console.log("role is QA")
          setID({...formData, qaID: data.id})
        }else if(role==="FinalQA"){
          console.log("role is final QA")
          setID({...formData, finalQAID: data.id})
        }else if(role==="Tech"){
          console.log("role is TECH")
          setID({...formData, opID: data.id})
        }else{
          console.log("role is unknown")
        }
        
        if((data.role === role ) || (data.role === "Admin")){
          SetSuccessLogin(true)
          setSignature(ConvertBlobToImage(data.signature))
          setDate(GetcurentDate)
          setStatus(data.role)
        }
        else{
          alert("Your role is not allowed to sign off!!")
        }
      },
      (error) => {
        setErrorMsg("Login Failed!")
        // alert("login Failed!")
        // console.log(error)
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }

  const SignOffDIV = () => {
    return (
      <>
         <Button variant="primary" className="agitator-sign-bttn" onClick={handleShow}>
            Sign Off
          </Button>
      </>
    )
  }

  const SignImageDIV = () => {
    return(
      <>
        <img src={signature}></img>
        {/* <input type='hidden' name='opID' value={operatorID} /> */}
      </>
    )
  }

  return (
    <>
    <div>
        <Grid item={6} >
          {successLogin === false ? <SignOffDIV /> : <SignImageDIV />}
          {/* <label>Date</label> */}
          {/* NEED TO DO!!! */}
          {/* <label style={{fontSize: "medium"}}>{opDate}</label>  */}
        </Grid>
    </div>
    <Grid container xs={1} spacing="0" direction="row" justify="flex-start">
        <Grid >
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="Modal.ControlInput1">
                  <Form.Label>Enter User Name</Form.Label>
                  <Form.Control type="username" placeholder="user name" required={true} value={userData.username} onChange={(e)=> setUserData({...userData, username: e.target.value})}/>
                </Form.Group>
                <Form.Group className="password" controlId="Modal.Password">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control type='password' rows={3} required={true} value={userData.password} onChange={(e)=> setUserData({...userData, password: e.target.value})}/>
                </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <span style={{color: "red"}}>{errorMsg}</span>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
        </Grid>
    </Grid>
    </>
  );
}

export default App;