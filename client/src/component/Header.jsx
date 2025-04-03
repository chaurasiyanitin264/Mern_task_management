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

                    {/* <span className="user-name-display">{adminName || username}</span> */}
                        {(adminProfile && adminProfile !== "null" && adminProfile !== "") || (userProfile && userProfile !== "null" && userProfile !== "") ? (
                            <img
                                src={adminProfile || userProfile}
                                alt="Profile"
                                className="profile-image"
                                onClick={() => setShowModal(!showModal)}
                            />
                        ) : null}
                       
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
                     <div>
                     <span className="user-name-display">{adminName || username}</span>
                     </div>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{width:"150px"}}
                    >
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
