import React, { useState } from "react";
import { FaUpload } from "react-icons/fa"; // Importing the upload icon from react-icons
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    console.log(`token here is ${token}`);

    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    alert(selectedFile.name + " is all set to upload to the database");

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", selectedFile);
    // 'file' should match the backend field name

    try {
      const response = await fetch("http://127.0.0.1:3000/upload", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
        body: formData, // Send FormData, not the file directly
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setSelectedFile("No File Selected");
      } else {
        const error = await response.text();
        console.error("Upload failed:", error);
        alert("Upload failed: " + error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file: " + error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Upload a File</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={selectedFile ? selectedFile.name : "No file selected"}
          readOnly
        />
        <div className="input-group-append mx-1">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            name="file"
            accept="image/*"
            id="fileInput"
          />
          <label className="btn btn-secondary" htmlFor="fileInput">
            {/* <FaUpload /> Upload symbol */}
            <FaUpload />
          </label>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
