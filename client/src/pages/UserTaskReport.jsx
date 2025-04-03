import { useState,useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import rightimg from "../img/right.png";
import pendingimg from "../img/pending.jpg";
import Button from 'react-bootstrap/Button';
import { message } from "antd";
import WEB_URL from "../config";
const UserTaskReport=()=>{
    const [mydata,setMydata]=useState([]);
    const loadData=async()=>{
        let api=`${WEB_URL}/admin/usertaskdisplay`
        try {
            const response=await axios.get(api);
            setMydata(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loadData();
    },[])

  const reassignTask=async(taskid)=>{
    try {
        let api=`${WEB_URL}/admin/reasigntask`;
        const response=await axios.post(api,{taskid:taskid});
        message.success(response.data.msg)
        loadData();
    } catch (error) {
        console.log(error)
    }
  }

    let sno=0;
    const ans=mydata.map((key)=>{
        sno++;
        return(
            <>
            <tr>
                <td>{key.empreport=="submited"?<img src={rightimg} height="10px" />:<img src={pendingimg} height="10px"/>}</td>
                <td>{sno}</td>
                <td>{key.empid.name}</td>
                <td>{key.empid.email}</td>
                <td>{key.empid.designation}</td>
                <td>{key.title}</td>
                <td>{key.description}</td>
                <td>{key.duration}</td>
                <td>{key.taskstatus}</td>
                <td>{key.empreport}</td>
                <td>
                 {key.empreport=="submited"?(
                    <>
                      <span style={{color:"green", fontWeight:"bold"}}>{key.empreport} </span>
                    </>
                 ):(
                    <>
                      <span style={{color:"red", fontWeight:"bold"}}>{key.empreport} </span>
                    </>
                 )} </td>



             <td>
             <Button variant="primary" size="sm"
                  onClick={()=>{reassignTask(key._id)}}
                 style={{fontSize:"10px"}}>ReAssing</Button>

             </td>
            </tr>
            </>
        )
    })
  
    return(
      <>
      <div className="table-responsive" style={{overflow:"scroll"}}>
          <Table striped bordered hover size="sm">
              <thead className="table-primary tablesize">
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
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {ans}
              </tbody>
          </Table>
      </div>
      </>
  );
}
export default UserTaskReport;