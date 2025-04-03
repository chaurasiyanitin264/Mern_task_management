import { useEffect, useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { message } from "antd"
import WEB_URL from "../config";
const ResetPassword = () => {
    const [input, setInput] = useState({});
    const [userid, setUserId] = useState("");

    useEffect(() => {
        setUserId(localStorage.getItem("userid"));
    }, [])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
        console.log(input)
    }
    const handleSubmit = async (changepass) => {
        try {
            let api = `${WEB_URL}/user/changepass`;
            const response = await axios.post(api, { userid: userid, ...input });
            message.success(response.data.msg)
            setInput({
                oldpassword:"",
                newpassword:"",
                confirmpassword:""
            })
        } catch (error) {
            message.error(error.response.data.msg)
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
                        border: "1px solid #4ca1af",
                        margin: "10px"
                    }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Label className="fw-bold"> Old Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Old Password"
                                    name="oldpassword"
                                    value={input.oldpassword}
                                    onChange={handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Label className="fw-bold">New Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter New Password "
                                    name="newpassword" value={input.newpassword}
                                    onChange={handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername" >
                            <Form.Label className="fw-bold">Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter Confirm Password "
                                    name="confirmpassword" value={input.confirmpassword}
                                    onChange={handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            type="button"
                            style={{
                                background: "linear-gradient(to right, #8e44ad, #3498db)",
                                border: "none",
                            }}
                            onClick={handleSubmit} >
                            Change Password
                        </Button>
                    </Form>
                </Card>
            </div>

        </>
    )
}
export default ResetPassword;