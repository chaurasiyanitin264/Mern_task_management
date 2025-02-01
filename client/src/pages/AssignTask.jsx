import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
// import Table from 'react-bootstrap/Table';
import { Modal, Button, Form, Table } from "react-bootstrap";
const AssignTask = () => {
    const [mydata, setmydata] = useState([]);
    const [input,setInput]=useState({});
    const [empId,setEmpId]=useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (empid) => {
        setEmpId(empid);
        setShow(true);
    }
    


    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setInput(values=>({...values,[name]:value}));
        console.log(input)
    }

    const handleSubmit=async()=>{
              try {
                let api="http://localhost:8000/admin/assigntask";
                const response=await axios.post(api,{empid:empId,...input});
                message.success("Task assign")
                setInput({
                    title:"",
                    description:"",
                    duration:""
                })
              } catch (error) {
                console.log(error)
              }
    }

    const loadData = async () => {
        try {
            let api = "http://localhost:8000/admin/assigntaskdisplay";
            const response = await axios.get(api);
            // console.log(response.data);
            setmydata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    let sno=1;
    const ans = mydata.map((key) => {
        return (
            <tr key={key.id}>
                <td>{sno++}</td>
                <td>{key.name}</td>
                <td>{key.email}</td>
                <td>{key.designation}</td>
                <td>
                    <Button variant="success" onClick={()=>{handleShow(key._id)}}>Assign</Button>

                </td>
            </tr>
        );
    });

    return (
        <div className="card p-4 shadow-custom">
            <Table  striped bordered hover >
                <thead class="table-primary">
                    <tr>
                        <th></th>
                        <th>Emp Name</th>
                        <th>Emp Email</th>
                        <th>Designation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>

            <Modal  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  >
                        <Form.Group controlId="formTaskTitle">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                
                                type="text"
                                placeholder="Enter task title"
                                name="title" value={input.title} onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskDescription" className="mb-3">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                            as="textarea" rows={2}
                                type="text"
                                placeholder="Enter task description"
                                name="description" value={input.description} onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTimeDuration" className="mb-3">
                            <Form.Label>Time Duration (hours)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter time duration"
                                name="duration" value={input.duration} onChange={handleInput}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleSubmit}>
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default AssignTask;
