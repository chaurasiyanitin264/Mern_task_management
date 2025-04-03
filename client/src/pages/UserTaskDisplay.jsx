import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { message } from "antd";
import WEB_URL from "../config";

const UserTaskDisplay = () => {
    const [mydata, setMydata] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});

    // Data Load Function
    const loadData = async () => {
        try {
            const userid = localStorage.getItem("userid");
            if (!userid) {
                message.error("User ID not found in localStorage!");
                return;
            }
            let api = `${WEB_URL}/user/usertaskdisplay?id=${userid}`;
            const response = await axios.get(api);
            if (response.status === 200) {
                setMydata(response.data);
            }
        } catch (error) {
            console.error("Error loading tasks:", error.response?.data?.msg || error.message);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Task Submit Function
    const taskSubmit = async (taskid) => {
        if (!taskStatus[taskid]) {
            message.warning("Please select a status before submitting!");
            return;
        }
        try {
            let api = `${WEB_URL}/user/usertasksubmit`;
            const response = await axios.post(api, { taskid: taskid, taskstatus: taskStatus[taskid] });
            message.success(response.data);
            loadData();
        } catch (error) {
            console.error("Task submission failed:", error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="table-responsive" style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
            <Table striped bordered hover size="sm">
                <thead className="table-primary tablesize">
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Send Report</th>
                    </tr>
                </thead>
                <tbody>
                    {mydata.map((task, index) => (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.duration}</td>
                            <td>
                                <Form.Select
                                    size="sm"
                                    name="taskStatus"
                                    value={taskStatus[task._id] || ""}
                                    onChange={(e) => setTaskStatus({ ...taskStatus, [task._id]: e.target.value })}
                                >
                                    <option value="">Choose</option>
                                    <option value="Fully Completed">Fully Completed</option>
                                    <option value="Partial Completed">Partial Completed</option>
                                    <option value="No Completed">No Completed</option>
                                </Form.Select>
                            </td>
                            <td>
                                {task.empreport === "submited" ? (
                                    <Button disabled>Submitted</Button>
                                ) : (
                                    <Button onClick={() => taskSubmit(task._id)}>Send</Button>
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
