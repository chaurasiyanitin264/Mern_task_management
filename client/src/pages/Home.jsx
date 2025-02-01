import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import {message} from "antd";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const navigate=useNavigate();
  // console.log(userid,password,usertype)
  const handleSubmit=async()=>{
    if (usertype=="admin")
      {           
           try {
            let api="http://localhost:8000/admin/admindata";
            const response= await axios.post(api, {userid:userid, password:password});
            console.log(response.data);
            if (response.status==200)
            {
              console.log(response.data)
              localStorage.setItem("adminName",response.data.username);
              localStorage.setItem("userID",response.data.userid);
              message.success("Login Succesfully!");
            
              navigate("/dashboard")
            }
           } catch (error) {
            message.error(error.response.data.msg);
           }
      }
      else{
        if(usertype=="user")
        {
          try {
            let api="http://localhost:8000/user/userlogin";
            const response=await axios.post(api,{userid:userid,password:password});
            // console.log(response.data)
           if(response.status==200)
           {
            message.success("User Login");
            localStorage.setItem("username",response.data.name);
            localStorage.setItem("useremail",response.data.email);
            localStorage.setItem("userid",response.data._id);
            navigate("/userdashboard")
           }
          } catch (error) {
            message.error(error.response.data.msg)
          }
        }
      }

   }
  return (

    <>
      {/* <h1> User Login!</h1> */}
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        
      >
        <Card
          className="p-4 shadow"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            border:"1px solid #4ca1af",
          }}
        >
          <h2 className="text-center mb-2">Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername" >
              <Form.Label className="fw-bold">User ID</Form.Label>
              <InputGroup>
               
                <Form.Control
                  type="text"
                  placeholder="Type your User ID"
                  className="form-control"
                 value={userid}
                  onChange={(e)=>{setUserId(e.target.value)}}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <InputGroup>
                
                <Form.Control
                  type="password"
                  placeholder="Type your password"
                  className="form-control"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: "auto" }}>
              <Form.Label>Login As:</Form.Label>
              <Form.Select aria-label="Default select example"  name="usertype" value={usertype}
               onChange={(e)=>{setUsertype(e.target.value)}}>
                <option>Login User As</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              type="button"
              style={{
                background: "linear-gradient(to right, #8e44ad, #3498db)",
                border: "none",
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Card>
      </div>
    </>
  )
}
export default Home;