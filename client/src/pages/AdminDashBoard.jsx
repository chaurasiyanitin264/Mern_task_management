import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import React from "react";
import { message } from "antd";


const DashBoard = () => {
    const [adminName, setAdminName] = useState("");
    // const [userID, setUserID] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setAdminName(localStorage.getItem("adminName"))
        // setUserID(localStorage.getItem("userID"))
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
                welcome:{adminName} (Admin)
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
                                    <Link to="createuser" className="nav-link" id="create">
                                        Create User
                                    </Link>
                                    <Link to="assigntask" className="nav-link" id="create1">
                                        Assign Task
                                    </Link>
                                    <Link to="usertaskreport" className="nav-link" id="create1">
                                        Task Report
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
export default DashBoard;