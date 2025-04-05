import { useState } from "react";
import axios from "axios";
import WEB_URL from "../config";
import '../pages/createUser.css'

const CreateUser = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        designation: ""
    });
    const [uploadImage, setUploadImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", content: "" });

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!input.name || !input.email || !input.designation) {
            setMessage({ type: "error", content: "Please fill all required fields" });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: "", content: "" });

        try {
            let imageUrl = ""; // Default image URL
            
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
                setMessage({ type: "success", content: "User Successfully Created!" });
                setInput({ name: "", email: "", designation: "" });
                setUploadImage(null);
                setPreviewImage(null);
            } else {
                setMessage({ type: "error", content: "Failed to create user." });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", content: "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-user-container">
            <div className="form-card">
                <div className="form-header">
                    <h2>Create New Employee</h2>
                    <p>Add a new employee to the task management system</p>
                </div>

                {message.content && (
                    <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
                        {message.content}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-layout">
                        <div className="form-left">
                            <div className="form-group">
                                <label htmlFor="name">Employee Name <span className="required">*</span></label>
                                <div className="input-group">
                                    <i className="input-icon user-icon"></i>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Employee Name"
                                        value={input.name}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Employee Email <span className="required">*</span></label>
                                <div className="input-group">
                                    <i className="input-icon email-icon"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Employee Email"
                                        value={input.email}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="designation">Designation <span className="required">*</span></label>
                                <div className="input-group">
                                    <i className="input-icon job-icon"></i>
                                    <select
                                        id="designation"
                                        name="designation"
                                        value={input.designation}
                                        onChange={handleInput}
                                        required
                                    >
                                        <option value="">Choose Designation</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Python">Python</option>
                                        <option value="Java">Java</option>
                                        <option value="Graphic Designer">Graphic Designer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="profile-upload">
                                <div className="profile-preview">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Profile preview" className="preview-image" />
                                    ) : (
                                        <div className="preview-placeholder">
                                            <i className="upload-icon"></i>
                                            <span>Profile Photo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="upload-controls">
                                    <label htmlFor="profile-upload" className="upload-button">
                                    <span className="required">*</span>  Choose Image
                                    </label>
                                    <input
                                        type="file"
                                        id="profile-upload"
                                        accept="image/*"
                                        onChange={handleImage}
                                        className="file-input"
                                        required
                                    />
                                    {uploadImage && (
                                        <span className="file-name">{uploadImage.name}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;