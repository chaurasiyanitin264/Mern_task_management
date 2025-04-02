import { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

const CreateUser = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        designation: ""

    });
    const [uploadImage, setUploadImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImage(file);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            let imageUrl = "";
            if (uploadImage) {
                const formData = new FormData();
                formData.append("file", uploadImage);
                formData.append("upload_preset", "myimage");
                formData.append("cloud_name", "dtwwlicj1");

                const response = await axios.post(
                    "https://mern-task-management-4lk3.onrender.com/image/upload",
                    formData
                );
                imageUrl = response.data.url;
            }

            const api = "https://mern-task-management-4lk3.onrender.com/admin/usercreate";
            const userResponse = await axios.post(api, {
                userProfile: imageUrl,
                ...input
            });

            if (userResponse.status === 201 || userResponse.status === 200) {
                message.success("User Successfully Created!");
                setInput({
                    name: "",
                    email: "",
                    designation: ""
                });
                setUploadImage(null);
            } else {
                message.error("Failed to create user.");
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center ">
            <Card
                className="card p-4 shadow-custom"
                style={{
                    width: "auto",
                    maxWidth: "400px",
                    borderRadius: "10px",
                    border: "1px solid #4ca1af",
               
                    marginTop:"70px",
                    // marginBottom:"300px"
                    
                }}
            >
                <h2 className="text-center mb-3">Create New Employee</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label className="fw-bold">Employee Name</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Enter Employee Name"
                                name="name"
                                value={input.name}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="fw-bold">Employee Email</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="email"
                                className="form-control"
                                placeholder="Enter Employee Email"
                                name="email"
                                value={input.email}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Designation</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name="designation"
                            value={input.designation}
                            onChange={handleInput}
                        >
                            <option value="">Choose Designation</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control type="file" onChange={handleImage} />
                    </Form.Group>

                    <Button
                        variant="primary"
                        className="w-100"
                        type="button"
                        style={{
                            background: "linear-gradient(to right, #8e44ad, #3498db)",
                            border: "none"
                        }}
                        onClick={handleSubmit}
                    >
                        Create Employee
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default CreateUser;
