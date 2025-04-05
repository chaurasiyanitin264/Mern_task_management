import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    const adminName = localStorage.getItem("adminName");
    const username = localStorage.getItem("username");
    const adminProfile = localStorage.getItem("adminProfile");
    const userProfile = localStorage.getItem("userProfile");
    
    const logout = () => {
        localStorage.clear();
        setShowModal(false);
        navigate("/home");
    };
    
    return (
        <div className="header-container">
            {adminName || adminProfile || username || userProfile ? (
                <header className="header-gradient">
                    <div className="brand">
                        <h3 className="brand-title">Task Management</h3>
                    </div>
                    <div className="user-section">
                        <span className="user-name-display">{adminName || username}</span>
                        {(adminProfile && adminProfile !== "null" && adminProfile !== "") || 
                         (userProfile && userProfile !== "null" && userProfile !== "") ? (
                            <div className="profile-container">
                                <img
                                    src={adminProfile || userProfile}
                                    alt="Profile"
                                    className="profile-image"
                                    onClick={() => setShowModal(!showModal)}
                                />
                            </div>
                        ) : (
                            <div 
                                className="profile-placeholder"
                                onClick={() => setShowModal(!showModal)}
                            >
                                {(adminName || username) ? (adminName || username).charAt(0).toUpperCase() : "U"}
                            </div>
                        )}
                    </div>
                </header>
            ) : (
                <header className="header-gradient">
                    <div className="brand">
                        <h3 className="brand-title">Task Management System</h3>
                    </div>
                </header>
            )}
            
            {/* Modal */}
            {showModal && (
                <div
                    className="modal-backdrop"
                    onClick={() => setShowModal(false)}
                >
                    <div 
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            {(adminProfile && adminProfile !== "null" && adminProfile !== "") || 
                             (userProfile && userProfile !== "null" && userProfile !== "") ? (
                                <img
                                    src={adminProfile || userProfile}
                                    alt="Profile"
                                    className="modal-profile-image"
                                />
                            ) : (
                                <div className="modal-profile-placeholder">
                                    {(adminName || username) ? (adminName || username).charAt(0).toUpperCase() : "U"}
                                </div>
                            )}
                            <h4 className="modal-username">{adminName || username}</h4>
                        </div>
                        <div className="modal-options">
                            <button onClick={logout} className="logout-button">
                                <i className="logout-icon"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;