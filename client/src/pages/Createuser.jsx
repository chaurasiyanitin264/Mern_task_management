import { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { message } from "antd"

const CreateUser = () => {
    const [input, setInput] = useState({});
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
        console.log(input)
    }
    const handleSubmit = async () => {
        try {
            let api = "http://localhost:8000/admin/usercreate";
            const response = await axios.post(api, input);
            console.log(response.data);
            message.success("user Successfully Created!!!!!")
            setInput({
                name: "",
                email: "",
                designation: ""
            });
        } catch (error) {
            message.error(error);

        }
    }

    return (
        <>
            <div
               className="d-flex justify-content-center align-items-center vh-150"  
            >
                <Card
                     className="card p-4 shadow-custom"
                    style={{
                        width: "auto",
                        maxWidth: "400px",
                        borderRadius: "10px",
                        border:"1px solid #4ca1af",
                        margin:"10px"

                    


                    }}>
                    <h2 className="text-center mb-1">Create New Employee</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Label className="fw-bold"> Employee Name</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                     className="form-control"
                                    placeholder="Enter Employee Name"
                                    name="name" value={input.name} onChange={handleInput} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Label className="fw-bold">  Employee Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                     className="form-control"
                                    placeholder=" Enter Employee Email"
                                    name="email" value={input.email} onChange={handleInput} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Select aria-label="Default select example" name="designation" value={input.designation} onChange={handleInput}>
                                <option>Choose Designation</option>
                                <option value="Frontend">Frontend </option>
                                <option value="Backend">Backend</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                            </Form.Select>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className="fw-bold"> Employee Password</Form.Label>
                            <InputGroup>   
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Employee password"
                                    name="password" value={input.password} onChange={handleInput} />
                            </InputGroup>
                        </Form.Group> */}
                        <Button
                            variant="primary"
                            className="w-100"
                            type="button"
                            style={{
                                background: "linear-gradient(to right, #8e44ad, #3498db)",
                                border: "none",
                            }} onClick={handleSubmit}>
                            Empolyee Created
                        </Button>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default CreateUser;