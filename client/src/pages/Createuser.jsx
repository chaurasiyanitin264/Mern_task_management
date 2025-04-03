import { useState } from "react";
import { Form, Button, Card, InputGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import WEB_URL from "../config";

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
            let imageUrl = ""; // Default image URL blank rakha hai
            
            if (uploadImage) {
                const formData = new FormData();
                formData.append("file", uploadImage);
                formData.append("upload_preset", "myimage");
                formData.append("cloud_name", "dtwwlicj1");

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dtwwlicj1/image/upload",
                    formData
                );
                imageUrl = response.data.secure_url;
            }

            const api = `${WEB_URL}/admin/usercreate`;
            const userResponse = await axios.post(api, {
                userProfile: imageUrl,
                ...input
            });

            if (userResponse.status === 201 || userResponse.status === 200) {
                message.success("User Successfully Created!");
                setInput({ name: "", email: "", designation: "" });
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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                    <Card 
                        className="shadow p-4"
                        style={{
                            borderRadius: "12px",
                            border: "1px solid #4ca1af",
                            background: "#fff"
                        }}
                    >
                        <h2 className="text-center mb-3">Create New Employee</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Employee Name</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Employee Name" 
                                        name="name" 
                                        value={input.name} 
                                        onChange={handleInput} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Employee Email</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter Employee Email" 
                                        name="email" 
                                        value={input.email} 
                                        onChange={handleInput} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Designation</Form.Label>
                                <Form.Select name="designation" value={input.designation} onChange={handleInput}>
                                    <option value="">Choose Designation</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="Graphic Designer">Graphic Designer</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Upload Profile Picture</Form.Label>
                                <Form.Control type="file" onChange={handleImage} />
                            </Form.Group>

                            <Button variant="primary" className="w-100" onClick={handleSubmit}>
                                Create Employee
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;
