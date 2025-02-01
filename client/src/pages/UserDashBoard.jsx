import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import React from "react";
import { message } from "antd";


const UserDashBoard = () => {
    const [userName, setUserName] = useState("");
    const [useremail,setUserEmail]=useState("");
    // const [userID, setUserID] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setUserName(localStorage.getItem("username"))
        setUserEmail(localStorage.getItem("useremail"))
    }, []);
    const logout = () => {
        localStorage.clear();
        message.success("Logout!!!")
        navigate("/home");
    }
    return (
        <>
            <div id="div" className="card p-4 shadow-custom"
             style={{ border:"1px solid #4ca1af",}}>
                welcome:{userName} <br />
                Email:{useremail}(User)
                {/* {userID} */}
                <center>
                    <Button style={{ width: "150px" }} variant="primary" onClick={logout}>Logout</Button>
                    
                </center>

            </div>

            <div id='div1'>
                <div id="div2">
                    {/* <Link to="createuser">CreateUser</Link> */}
                    <aside>
                        <nav className="navbar">
                            <div className="container">
                                <div className="nav-links" >
                                    <Link to="usertaskdisplay" className="nav-link" id="create">
                                         User Task 
                                    </Link>
                                    <Link to="resetpassword" className="nav-link" id="create1">
                                        Reset Password
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </aside>
                </div>
                <div id="div3">
                    <Outlet />
                </div>

            </div>
        </>
    )
}
export default UserDashBoard;