import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { message } from "antd";
import WEB_URL from "../config";

const UserTaskDisplay = () => {
    const [mydata, setMydata] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Function to load tasks
    const loadData = async () => {
        try {
            const userid = localStorage.getItem("userid");
            const response = await axios.get(`${WEB_URL}/user/usertaskdisplay?id=${userid}`);
            if (response.status === 200) {
                setMydata(response.data);
            }
        } catch (error) {
            message.error(error.response?.data?.msg || "Error fetching tasks");
        }
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    // Function to submit task status
    const taskSubmit = async (taskid) => {
        try {
            if (!taskStatus[taskid]) {
                return message.warning("Please select a status before submitting!");
            }

            const response = await axios.post(`${WEB_URL}/user/usertasksubmit`, {
                taskid,
                taskstatus: taskStatus[taskid]
            });

            message.success(response.data);
            loadData();
        } catch (error) {
            message.error(error.response?.data?.msg || "Error submitting task");
        }
    };

    // Mobile/Tablet card view
    if (isMobile) {
        return (
            <div style={{
                padding: '10px',
                maxWidth: '100%'
            }}>
                {mydata.map((task, index) => (
                    <div key={task._id} style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        padding: '16px',
                        marginBottom: '16px',
                        border: '1px solid #eaeaea'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                            borderBottom: '1px solid #f0f0f0',
                            paddingBottom: '8px'
                        }}>
                            <div style={{
                                backgroundColor: '#0d6efd',
                                color: 'white',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '12px',
                                fontWeight: 'bold'
                            }}>
                                {index + 1}
                            </div>
                            <h3 style={{
                                margin: '0',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                {task.title}
                            </h3>
                        </div>

                        <div style={{
                            marginBottom: '12px',
                            padding: '8px 0'
                        }}>
                            <div style={{
                                fontWeight: 'bold',
                                marginBottom: '4px',
                                color: '#555'
                            }}>
                                Description:
                            </div>
                            <div style={{
                                backgroundColor: '#f9f9f9',
                                padding: '8px',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}>
                                {task.description}
                            </div>
                        </div>

                        <div style={{
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                fontWeight: 'bold',
                                marginRight: '8px',
                                color: '#555'
                            }}>
                                Duration:
                            </div>
                            <div style={{
                                backgroundColor: '#e8f4ff',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#0d6efd'
                            }}>
                                {task.duration}
                            </div>
                        </div>

                        <div style={{
                            marginBottom: '16px'
                        }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: 'bold',
                                color: '#555'
                            }}>
                                Status:
                            </label>
                            <Form.Select
                                size="sm"
                                name="taskStatus"
                                value={taskStatus[task._id] || ""}
                                onChange={(e) => setTaskStatus({ ...taskStatus, [task._id]: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da'
                                }}
                            >
                                <option value="">Choose Status</option>
                                <option value="Fully Completed">Fully Completed</option>
                                <option value="Partial Completed">Partial Completed</option>
                                <option value="Not Completed">Not Completed</option>
                            </Form.Select>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            {task.empreport === "submited" ? (
                                <Button 
                                    disabled
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#6c757d',
                                        opacity: '0.65'
                                    }}
                                >
                                    Submitted
                                </Button>
                            ) : (
                                <Button 
                                    onClick={() => taskSubmit(task._id)}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#0d6efd',
                                        borderColor: '#0d6efd'
                                    }}
                                >
                                    Send Report
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Desktop/Laptop table view
    return (
        <div style={{
            padding: '20px',
            borderRadius: '8px',
            // backgroundColor: '#ffffff',
            boxShadow: '0 0 15px rgba(0,0,0,0.05)',
            maxWidth: '100%',
            overflow: 'auto'
        }}>
            <Table 
                striped 
                bordered 
                hover 
                responsive
                style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #dee2e6'
                }}
            >
                <thead>
                    <tr style={{ background: "linear-gradient(90deg, #4ca1af, #2c3e50)",color:"white" }}>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600',
                            textAlign: 'center',
                            width: '50px'
                        }}>#</th>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600'
                        }}>Title</th>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600'
                        }}>Description</th>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600',
                            textAlign: 'center',
                            width: '100px'
                        }}>Duration</th>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600',
                            width: '180px'
                        }}>Status</th>
                        <th style={{
                            padding: '12px 15px',
                            fontWeight: '600',
                            textAlign: 'center',
                            width: '120px'
                        }}>Send Report</th>
                    </tr>
                </thead>
                <tbody>
                    {mydata.map((task, index) => (
                        <tr key={task._id} style={{
                            backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff'
                        }}>
                            <td style={{
                                padding: '12px 15px',
                                textAlign: 'center',
                                fontWeight: '500'
                            }}>{index + 1}</td>
                            <td style={{
                                padding: '12px 15px',
                                fontWeight: '500'
                            }}>{task.title}</td>
                            <td style={{
                                padding: '12px 15px'
                            }}>{task.description}</td>
                            <td style={{
                                padding: '12px 15px',
                                textAlign: 'center'
                            }}>{task.duration}</td>
                            <td style={{
                                padding: '12px 15px'
                            }}>
                                <Form.Select
                                    size="sm"
                                    name="taskStatus"
                                    value={taskStatus[task._id] || ""}
                                    onChange={(e) => setTaskStatus({ ...taskStatus, [task._id]: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '5px 10px'
                                    }}
                                >
                                    <option value="">Choose</option>
                                    <option value="Fully Completed">Fully Completed</option>
                                    <option value="Partial Completed">Partial Completed</option>
                                    <option value="Not Completed">Not Completed</option>
                                </Form.Select>
                            </td>
                            <td style={{
                                padding: '12px 15px',
                                textAlign: 'center'
                            }}>
                                {task.empreport === "submited" ? (
                                    <Button 
                                        disabled
                                        size="sm"
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        Submitted
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={() => taskSubmit(task._id)}
                                        size="sm"
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#0d6efd',
                                            borderColor: '#0d6efd'
                                        }}
                                    >
                                        Send
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTaskDisplay;