import React, { useState } from "react";
import { Form, Button, Card, InputGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import WEB_URL from "../config";
import { FaUser, FaLock, FaUserCircle, FaRegEnvelope, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-vh-100" style={{ backgroundColor: "#f5f7ff" }}>
      <Container fluid className="p-0 h-100">
        <Row className="g-0 min-vh-100">
          {/* Left decorative panel - hidden on small screens */}
          <Col lg={6} className="d-none d-lg-block p-0">
            <div 
              className="h-100 d-flex flex-column justify-content-center align-items-center text-white position-relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6e42ec 0%, #8d44ff 50%, #4777ef 100%)",
                padding: "2rem"
              }}
            >
              {/* Decorative circles */}
              <div className="position-absolute" style={{ top: "10%", left: "15%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.05)" }}></div>
              <div className="position-absolute" style={{ bottom: "5%", right: "10%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.07)" }}></div>
              
              <div className="text-center p-5 position-relative z-index-1">
                <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
                <p className="lead mb-5 px-4">Log in to access your personalized dashboard and manage your tasks efficiently.</p>
                <div 
                  className="p-3 bg-white bg-opacity-10 rounded-circle mx-auto mb-4 shadow-lg"
                  style={{ width: "180px", height: "180px" }}
                >
                  <FaUserCircle size={150} className="text-white text-opacity-90" />
                </div>
              </div>
            </div>
          </Col>
          
          {/* Right login panel */}
          <Col lg={6} xs={12} className="p-0">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <Card 
                className="border-0 rounded-4 w-100 shadow-lg"
                style={{ 
                  maxWidth: "500px",
                  margin: "2rem",
                  backgroundColor: "white",
                }}
              >
                <Card.Body className="p-4 p-sm-5">
                  {/* Mobile only header */}
                  <div className="d-block d-lg-none text-center mb-5">
                    <div className="text-center mb-4">
                      <div 
                        className="d-inline-block rounded-circle p-3 mb-3"
                        style={{ background: "linear-gradient(135deg, #6e42ec 0%, #4777ef 100%)" }}
                      >
                        <FaUserCircle size={40} className="text-white" />
                      </div>
                      <h2 className="fw-bold text-dark mb-0">Login</h2>
                      <p className="text-muted">Sign in to continue to your dashboard</p>
                    </div>
                  </div>
                  
                  <div className="px-0 px-sm-3">
                    <h3 className="fs-4 fw-bold mb-4 d-none d-lg-block text-center">Sign In to Your Account</h3>
                    
                    <Form className="mt-4">
                      <Form.Group className="mb-4">
                        <Form.Label className="text-muted small fw-bold">User ID</Form.Label>
                        <InputGroup className="border rounded-pill overflow-hidden bg-light">
                          <InputGroup.Text className="border-0 bg-light ps-3">
                            <FaRegEnvelope className="text-primary" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Enter your user ID"
                            value={userid}
                            onChange={(e) => setUserId(e.target.value)}
                            className="border-0 shadow-none py-3 bg-light"
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-muted small fw-bold">Password</Form.Label>
                        <InputGroup className="border rounded-pill overflow-hidden bg-light">
                          <InputGroup.Text className="border-0 bg-light ps-3">
                            <FaLock className="text-primary" />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-0 shadow-none py-3 bg-light"
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-muted small fw-bold">User Type</Form.Label>
                        <InputGroup className="border rounded-pill overflow-hidden bg-light">
                          <InputGroup.Text className="border-0 bg-light ps-3">
                            <FaUser className="text-primary" />
                          </InputGroup.Text>
                          <Form.Select 
                            value={usertype} 
                            onChange={(e) => setUsertype(e.target.value)}
                            className="border-0 shadow-none py-3 bg-light"
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
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <a href="#!" className="text-primary text-decoration-none small fw-semibold">Forgot password?</a>
                      </div>

                      <div className="d-grid mt-4">
                        <Button
                          variant="primary"
                          type="button"
                          disabled={!userid || !password || !usertype || isLoading}
                          onClick={handleSubmit}
                          className="rounded-pill py-3 fw-bold"
                          style={{ 
                            background: "linear-gradient(45deg, #6e42ec 0%, #4777ef 100%)",
                            border: "none",
                            boxShadow: "0 4px 15px rgba(110, 66, 236, 0.35)"
                          }}
                        >
                          {isLoading ? "Signing in..." : (
                            <>
                              Sign In <FaArrowRight className="ms-2" />
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className="text-center mt-4 py-3">
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