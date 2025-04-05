import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import rightimg from "../img/right.png";
import pendingimg from "../img/pending.jpg";
import Button from 'react-bootstrap/Button';
import { message } from "antd";
import WEB_URL from "../config";

const UserTaskReport = () => {
    const [mydata, setMydata] = useState([]);

    const loadData = async () => {
        let api = `${WEB_URL}/admin/usertaskdisplay`;
        try {
            const response = await axios.get(api);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const reassignTask = async (taskid) => {
        try {
            let api = `${WEB_URL}/admin/reasigntask`;
            const response = await axios.post(api, { taskid: taskid });
            message.success(response.data.msg);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>
            <div style={{ width: '100%', overflowX: 'auto', maxHeight: '80vh' }}>
                <Table striped bordered hover responsive size="sm" style={{ minWidth: '800px' }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Emp Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Report</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.map((key, index) => (
                            <tr key={index}>
                                <td>{key.empreport === "submited" ? <img src={rightimg} height="10px" alt="submitted" /> : <img src={pendingimg} height="10px" alt="pending" />}</td>
                                <td>{index + 1}</td>
                                <td>{key.empid.name}</td>
                                <td>{key.empid.email}</td>
                                <td>{key.empid.designation}</td>
                                <td>{key.title}</td>
                                <td>{key.description}</td>
                                <td>{key.duration}</td>
                                <td>{key.taskstatus}</td>
                                <td>{key.empreport}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => reassignTask(key._id)}>
                                        ReAssign
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserTaskReport;
