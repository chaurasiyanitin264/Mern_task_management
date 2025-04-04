import React, { useState } from "react";
import { Form, Button, Card, InputGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import WEB_URL from "../config";
import { FaUser, FaLock, FaUserCircle, FaRegEnvelope } from "react-icons/fa";

const Home = () => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userid || !password || !usertype) {
      message.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    const apiUrl =
      usertype === "admin"
        ? `${WEB_URL}/admin/admindata`
        : `${WEB_URL}/user/userlogin`;

    try {
      const response = await axios.post(apiUrl, { userid, password });
      if (response.status === 200) {
        message.success("Login Successful!");

        localStorage.setItem("userid", response.data._id || response.data.userid);

        if (usertype === "admin") {
          localStorage.setItem("adminName", response.data.username);
          localStorage.setItem("adminProfile", response.data.adminProfile);
          navigate("/dashboard");
        } else {
          localStorage.setItem("username", response.data.name);
          localStorage.setItem("userProfile", response.data.userProfile);
          navigate("/userdashboard");
        }
      }
    } catch (error) {
      message.error(error.response?.data?.msg || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid className="p-0 h-100">
        <Row className="g-0 min-vh-100">
          {/* Left decorative panel - hidden on small screens */}
          <Col lg={6} className="d-none d-lg-block p-0">
            <div 
              className="h-100 d-flex flex-column justify-content-center align-items-center text-white"
              style={{
                background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                padding: "2rem"
              }}
            >
              <div className="text-center p-5">
                <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
                <p className="lead mb-5">Log in to access your personalized dashboard and manage your tasks efficiently.</p>
                <div 
                  className="p-3 bg-white bg-opacity-10 rounded-circle mx-auto mb-4"
                  style={{ width: "200px", height: "200px" }}
                >
                  <FaUserCircle size={170} className="text-white text-opacity-90" />
                </div>
              </div>
            </div>
          </Col>
          
          {/* Right login panel */}
          <Col lg={6} xs={12} className="p-0">
            <div className="h-100 d-flex align-items-center">
              <Card 
                className="border-0 rounded-0 w-100"
                style={{ 
                  maxWidth: "100%",
                  backgroundColor: "transparent",
                  boxShadow: "none"
                }}
              >
                <Card.Body className="p-3 p-sm-4 p-md-5">
                  {/* Mobile only header */}
                  <div className="d-block d-lg-none text-center mb-5">
                    <h2 className="fw-bold text-primary">Login</h2>
                    <p className="text-muted">Sign in to continue to your dashboard</p>
                  </div>
                  
                  <div className="px-0 px-sm-3 px-md-5">
                    <h3 className="fs-4 fw-bold mb-4 d-none d-lg-block">Sign In</h3>
                    
                    <Form>
                      <Form.Group className="mb-4">
                        <InputGroup className="border rounded-pill overflow-hidden bg-white shadow-sm">
                          <InputGroup.Text className="border-0 bg-white ps-3">
                            <FaRegEnvelope className="text-primary" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="User ID"
                            value={userid}
                            onChange={(e) => setUserId(e.target.value)}
                            className="border-0 shadow-none py-3"
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <InputGroup className="border rounded-pill overflow-hidden bg-white shadow-sm">
                          <InputGroup.Text className="border-0 bg-white ps-3">
                            <FaLock className="text-primary" />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-0 shadow-none py-3"
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <InputGroup className="border rounded-pill overflow-hidden bg-white shadow-sm">
                          <InputGroup.Text className="border-0 bg-white ps-3">
                            <FaUser className="text-primary" />
                          </InputGroup.Text>
                          <Form.Select 
                            value={usertype} 
                            onChange={(e) => setUsertype(e.target.value)}
                            className="border-0 shadow-none py-3"
                            style={{ paddingLeft: "5px" }}
                          >
                            <option value="" disabled>Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check 
                          type="checkbox" 
                          id="rememberMe" 
                          label="Remember me" 
                          className="text-muted"
                        />
                        <a href="#!" className="text-primary text-decoration-none small">Forgot password?</a>
                      </div>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="button"
                          disabled={!userid || !password || !usertype || isLoading}
                          onClick={handleSubmit}
                          className="rounded-pill py-3 fw-bold"
                          style={{ 
                            background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                            border: "none",
                          }}
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </div>
                      
                      <div className="text-center mt-4">
                        <span className="text-muted me-2">Don't have an account?</span>
                        <a href="#!" className="text-primary fw-bold text-decoration-none">
                          Contact Admin
                        </a>
                      </div>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;