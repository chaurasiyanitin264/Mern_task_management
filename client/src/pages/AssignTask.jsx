import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import WEB_URL from "../config";
import { Modal, Button, Form, Table, Card, Container, Row, Col, Spinner } from "react-bootstrap";

const AssignTask = () => {
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({
        title: "",
        description: "",
        duration: ""
    });
    const [empId, setEmpId] = useState("");
    const [show, setShow] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (empid) => {
        setEmpId(empid);
        setInput({
            title: "",
            description: "",
            duration: ""
        });
        setShow(true);
    };

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!input.title || !input.description || !input.duration) {
            message.error("Please fill all required fields");
            return;
        }

        setSubmitting(true);
        try {
            let api = `${WEB_URL}/admin/assigntask`;
            const response = await axios.post(api, { empid: empId, ...input });
            message.success("Task assigned successfully");
            setInput({
                title: "",
                description: "",
                duration: ""
            });
            handleClose();
            loadData(); // Refresh data after assigning a task
        } catch (error) {
            console.log(error);
            message.error("Failed to assign task");
        } finally {
            setSubmitting(false);
        }
    };

    const loadData = async () => {
        setLoading(true);
        try {
            let api = `${WEB_URL}/admin/assigntaskdisplay`;
            const response = await axios.get(api);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
            message.error("Failed to load employee data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Desktop/Tablet Table View with proper scroll handling
    const TableView = () => (
        <div className="table-container">
            <Table striped bordered hover responsive>
                <thead className="table-primary">
                    <tr>
                        <th width="60">#</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th width="120">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mydata.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    className="w-100"
                                    onClick={() => handleShow(employee._id)}
                                >
                                    Assign Task
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );

    // Mobile Card View
    // const CardView = () => (
    //     <div className="d-md-none">
    //         {mydata.map((employee, index) => (
    //             <Card key={employee._id} className="mb-3 shadow-sm">
    //                 <Card.Header className="bg-light">
    //                     <div className="d-flex justify-content-between align-items-center">
    //                         <span className="fw-bold">#{index + 1} {employee.name}</span>
    //                     </div>
    //                 </Card.Header>
    //                 <Card.Body className="py-3">
    //                     <div className="mb-2">
    //                         <small className="text-muted">Email:</small>
    //                         <div className="text-break">{employee.email}</div>
    //                     </div>
    //                     <div className="mb-3">
    //                         <small className="text-muted">Designation:</small>
    //                         <div>{employee.designation}</div>
    //                     </div>
    //                     <Button 
    //                         variant="success" 
    //                         className="w-100"
    //                         onClick={() => handleShow(employee._id)}
    //                     >
    //                         Assign Task
    //                     </Button>
    //                 </Card.Body>
    //             </Card>
    //         ))}
    //     </div>
    // );

    return (
        <Container fluid className="py-3">
            <style jsx>{`
                /* CSS for responsive table with proper scrolling */
                .table-container {
                    position: relative;
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    margin-bottom: 1rem;
                    border-radius: 0.25rem;
                }
                
                /* Ensure table takes full width while allowing horizontal scroll */
                .table-container table {
                    width: 100%;
                    min-width: 650px; /* Ensure table has a minimum width */
                    margin-bottom: 0;
                    table-layout: auto;
                }
                
                /* Show scroll indicator on small screens */
                @media (max-width: 768px) {
                    .scroll-indicator {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #6c757d;
                        font-size: 0.75rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    .scroll-indicator svg {
                        margin-right: 0.25rem;
                        animation: swipe 1.5s ease-in-out infinite;
                    }
                    
                    @keyframes swipe {
                        0%, 100% { transform: translateX(-5px); }
                        50% { transform: translateX(5px); }
                    }
                }
                
                /* Hide scroll indicator on larger screens */
                @media (min-width: 769px) {
                    .scroll-indicator {
                        display: none;
                    }
                }
                
                /* Ensure text-break class works properly */
                .text-break {
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                }
            `}</style>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Assign Tasks to Employees</h5>
                <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={loadData}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Loading...
                        </>
                    ) : (
                        'Refresh'
                    )}
                </Button>
            </div>

            {loading && mydata.length === 0 ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : mydata.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <p>No employees available</p>
                </div>
            ) : (
                <>
                    {/* <CardView /> */}
                    
                    {/* Tablet/Desktop View with scroll indicator */}
                    <div className="d-none d-md-block">
                        <TableView />
                    </div>
                    
                    {/* Mobile Table View with scroll indicator */}
                    <div className="d-block d-md-none">
                        <div className="scroll-indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L9.293 7.5H2.5a.5.5 0 0 0 0 1h6.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                <path fillRule="evenodd" d="M2.5 14.5A1.5 1.5 0 0 1 1 13V3a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 12 3v1.5a.5.5 0 0 1-1 0V3a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 1 1 0V13a1.5 1.5 0 0 1-1.5 1.5h-8z"/>
                            </svg>
                            <span>Swipe to view more</span>
                        </div>
                        <TableView />
                    </div>
                </>
            )}

            {/* Task Assignment Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskTitle" className="mb-3">
                            <Form.Label>Task Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                name="title" 
                                value={input.title} 
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskDescription" className="mb-3">
                            <Form.Label>Task Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea" 
                                rows={3}
                                placeholder="Enter task description"
                                name="description" 
                                value={input.description} 
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTimeDuration" className="mb-3">
                            <Form.Label>Time Duration (hours) <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter time duration"
                                name="duration" 
                                value={input.duration} 
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-1" />
                                Saving...
                            </>
                        ) : (
                            'Save Task'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AssignTask;