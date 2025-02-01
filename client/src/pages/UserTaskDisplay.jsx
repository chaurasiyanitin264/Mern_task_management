import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import {message} from "antd";
const UserTaskDisplay = () => {
    // const [mydata, setMydata] = useState([]);
    const [mydata, setMydata] = useState([]);
    const [taskStatus, setTaskStatus] = useState("");
    const loadData = async () => {
       
        // try {
        //     const userid =  localStorage.getItem("userid");
        //     let api = `http://localhost:8000/user/usertaskdisplay?id=${userid}`;
        //     const response = await axios.get(api);
        //     console.log(response.data);
        //     if (response.status == 200) {
        //         setMydata(response.data);
        //     }
        // } catch (error) {
        //     console.log(error.response.data.msg)
        // }


try {
    const userid=localStorage.getItem("userid");
    let api="http://localhost:8000/user/usertaskdisplay";
    let response=await axios.post(api,{id:userid});
    if(response.status==200)
    {
        console.log(response.data);
        setMydata(response.data)
    }
   
} catch (error) {
    console.log(error)
}
      



    }
    useEffect(() => {
        loadData();
    }, []);

    const taskSubmit=async(taskid)=>{
    try {
        let api="http://localhost:8000/user/usertasksubmit";
        const response=await axios.post(api,{taskid:taskid,taskstatus:taskStatus});
        // console.log(response.data)
        message.success(response.data);
        loadData();
    } catch (error) {
        console.log(error)
    }
    }

    // console.log(mydata)
    let sno=1;
    const ans = mydata.map((key) => {
        return (
           
            <>
            
                <tr>
                <td>{sno++}</td>
                    <td>{key.title}</td>
                    <td>{key.description}</td>
                    <td>{key.duration}</td>
                    <td>
            <Form.Select size="sm" name="taskStatus" value={taskStatus} onChange={(e)=>{setTaskStatus(e.target.value)}}>
               <option value="Fully Completed">Fully Completed</option>
               <option value="Partial Completed">Partial Completed</option>
               <option value="No Completed">No Completed</option>
            </Form.Select>
             </td>
            <td> 
             {key.empreport=="submited"?(<Button disabled>submitted</Button>):(<Button onClick={()=>{taskSubmit(key._id)}}>Send</Button>)}  
        
            </td>
                </tr>
            </>
        )
    })

    return (
        <>
            {/* <h4>User Task:{userid}</h4> */}
            <div className="card p-4 shadow-custom">
                <Table striped bordered hover >
                    <thead class="table-secondary">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th> Status</th>
                            <th> Send Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ans}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default UserTaskDisplay;