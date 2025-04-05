import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub, 
  FaCheckCircle, 
  FaPaperPlane, 
  FaClock, 
  FaClipboardList, 
  FaUsers, 
  FaHeadset, 
  FaChevronRight, 
  FaStar
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="task-manager-footer">
      {/* Diagonal Divider */}
      <div className="diagonal-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="#f8f9fa" fillOpacity="1" d="M0,64L1440,0L1440,0L0,0Z"></path>
        </svg>
      </div>
      
      {/* Pre-Footer CTA Section */}
      <div className="pre-footer py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Ready to boost your productivity?</h2>
              <p className="lead text-muted">Join thousands of teams that use TaskMaster to organize, track, and manage their work efficiently.</p>
              <div className="d-flex align-items-center mt-4">
                <div className="me-4">
                  <div className="d-flex">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>
                  <p className="small text-muted mb-0 mt-1">From 1,000+ reviews</p>
                </div>
                <div className="vr mx-3 h-100"></div>
                <div className="d-flex align-items-center">
                  <div className="avatar-group me-3">
                    <div className="avatar" style={{ backgroundColor: '#6C63FF' }}></div>
                    <div className="avatar" style={{ backgroundColor: '#FF6584' }}></div>
                    <div className="avatar" style={{ backgroundColor: '#3F3D56' }}></div>
                    <div className="avatar" style={{ backgroundColor: '#F2994A' }}></div>
                  </div>
                  <div>
                    <p className="small text-muted mb-0">Trusted by over<br /><span className="fw-bold text-dark">10,000+</span> teams</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="cta-card p-4 shadow-sm rounded-4">
                <h5 className="fw-bold mb-3">Try TaskMaster free for 14 days</h5>
                <InputGroup className="mb-3">
                  <Form.Control placeholder="Enter your email" aria-label="Email" 
                    className="py-2 border-0 bg-light" />
                  <Button variant="primary" className="px-3">
                    <FaPaperPlane /> <span className="ms-2">Start Free</span>
                  </Button>
                </InputGroup>
                <p className="small text-muted mb-0">No credit card required. Cancel anytime.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Content */}
      <div className="main-footer py-5" style={{ backgroundColor: '#212529' }}>
        <Container>
          <Row className="mb-5">
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div className="mb-4">
                <h4 className="text-white d-flex align-items-center">
                  <FaClipboardList className="text-primary me-2" /> TaskMaster
                </h4>
                <p className="text-light opacity-75">
                  The all-in-one task management platform that helps teams organize, track, and manage work effectively.
                </p>
              </div>
              <div className="footer-features">
                <div className="feature-item">
                  <FaCheckCircle className="text-success me-2" />
                  <span className="text-light opacity-75">Advanced task tracking</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle className="text-success me-2" />
                  <span className="text-light opacity-75">Team collaboration tools</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle className="text-success me-2" />
                  <span className="text-light opacity-75">Progress analytics & reporting</span>
                </div>
              </div>
            </Col>
            
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="text-white mb-3">Product</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#!">Features</a></li>
                <li><a href="#!">Integrations</a></li>
                <li><a href="#!">Pricing</a></li>
                <li><a href="#!">Updates</a></li>
                <li><a href="#!">Roadmap</a></li>
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="text-white mb-3">Resources</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#!">Documentation</a></li>
                <li><a href="#!">Tutorials</a></li>
                <li><a href="#!">Blog</a></li>
                <li><a href="#!">Community</a></li>
                <li><a href="#!">API Reference</a></li>
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="text-white mb-3">Company</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#!">About Us</a></li>
                <li><a href="#!">Careers</a></li>
                <li><a href="#!">Press Kit</a></li>
                <li><a href="#!">Contact</a></li>
                <li><a href="#!">Legal</a></li>
              </ul>
            </Col>
            
            <Col lg={2} md={6}>
              <h5 className="text-white mb-3">Connect</h5>
              <div className="social-links d-flex flex-wrap">
                <a href="#!" className="social-icon" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#!" className="social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#!" className="social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#!" className="social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#!" className="social-icon" aria-label="GitHub">
                  <FaGithub />
                </a>
              </div>
              <div className="mt-4">
                <a href="#!" className="d-flex align-items-center text-white text-decoration-none mb-2">
                  <FaHeadset className="me-2" /> Support Center
                </a>
                <a href="#!" className="d-flex align-items-center text-white text-decoration-none">
                  <FaUsers className="me-2" /> User Community
                </a>
              </div>
            </Col>
          </Row>
          
          <hr className="footer-divider" />
          
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="text-light opacity-75 mb-0">
                © {new Date().getFullYear()} TaskMaster. All rights reserved.
              </p>
            </Col>
            <Col md={6}>
              <ul className="list-inline text-center text-md-end mb-0">
                <li className="list-inline-item me-3">
                  <a href="#!" className="text-light opacity-75 footer-bottom-link">Terms</a>
                </li>
                <li className="list-inline-item me-3">
                  <a href="#!" className="text-light opacity-75 footer-bottom-link">Privacy</a>
                </li>
                <li className="list-inline-item me-3">
                  <a href="#!" className="text-light opacity-75 footer-bottom-link">Security</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="text-light opacity-75 footer-bottom-link">Sitemap</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* CSS for the footer */}
      <style jsx>{`
        .diagonal-divider {
          position: relative;
          line-height: 0;
        }
        
        .pre-footer {
          position: relative;
        }
        
        .cta-card {
          background-color: white;
          border-left: 4px solid #0d6efd;
        }
        
        .avatar-group {
          display: flex;
        }
        
        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: -8px;
          border: 2px solid white;
        }
        
        .footer-features {
          margin-top: 20px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .footer-links li {
          margin-bottom: 12px;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .footer-links a:hover {
          color: white;
          transform: translateX(5px);
        }
        
        .footer-links a:hover::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #0d6efd;
          margin-right: 8px;
        }
        
        .social-links {
          display: flex;
          gap: 10px;
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background-color: #0d6efd;
          transform: translateY(-4px);
        }
        
        .footer-divider {
          margin: 2rem 0;
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .footer-bottom-link:hover {
          color: white !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;