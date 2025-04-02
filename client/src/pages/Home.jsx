
import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userid || !password || !usertype) {
      message.error("All fields are required!");
      return;
    }

    const apiUrl =
      usertype === "admin"
        ? "https://mern-task-management-4lk3.onrender.com/admin/admindata"
        : "https://mern-task-management-4lk3.onrender.com/user/userlogin";

    try {
      const response = await axios.post(apiUrl, { userid, password });
      if (response.status === 200) {
        message.success("Login Successful!");
        
        localStorage.setItem("userid", response.data._id || response.data.userid);
        
        if (usertype === "admin") {
          localStorage.setItem("adminName", response.data.username);
          localStorage.setItem("adminProfile",response.data.adminProfile);
          navigate("/dashboard");
        } else {
          localStorage.setItem("username", response.data.name);
          localStorage.setItem("userProfile",response.data.userProfile);
          navigate("/userdashboard");
        }
      }
    } catch (error) {
      message.error(error.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg" style={{marginTop:"100px",marginBottom:"50px", width: "100%", maxWidth: "400px", borderRadius: "10px" }}>
        <h2 className="text-center mb-3 text-primary">Login</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">User ID</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter your User ID"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Login As</Form.Label>
            <Form.Select value={usertype} onChange={(e) => setUsertype(e.target.value)}>
              <option value="" disabled>Select User Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            type="button"
            disabled={!userid || !password || !usertype}
            onClick={handleSubmit}
            style={{ border: "none" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Home;