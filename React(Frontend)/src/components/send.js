import { useState } from "react";

import { FaUpload } from "react-icons/fa";

const Send = () => {
  const [email, setEmail] = useState("");
  const [selectedFile, setFile] = useState(null);
  const [isverified, setverify] = useState(false);

  const handleverify = async () => {
    try {
      const response = await fetch("http://localhost:3000/verifyemailisok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setverify(true);
        alert("Email is verified now select file and press Send button");
      }
    } catch (error) {
      alert("Please enter authenticate email");
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const handleemail = (e) => {
    setEmail(e.target.value);
  };
  const handleSend = async () => {
    const token = localStorage.getItem("token");

    if (!isverified) {
      alert("Please verify your email first");
      return;
    }
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("sendtoemail", email);

    try {
      const response = await fetch("http://127.0.0.1:3000/send", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
        body: formData, // Send FormData, not the file directly
      });

      if (response.ok) {
        alert("File Sent successfully!");
        setverify(false);

        setFile(null);
        setEmail("");
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
    <div className="container my-3">
      <h2 className="text-center">Send a File</h2>
      <label htmlFor="name">
        <strong>Enter email: </strong>
      </label>
      <input
        className="mx-3"
        type="text"
        id="name"
        placeholder={email === "" ? "Enter authenticate email" : email}
        value={email}
        onChange={handleemail}
      />
      <button type="button" class="btn btn-dark" onClick={handleverify}>
        Verify Email
      </button>
      <br />
      <br />
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
        <button className="btn btn-primary mx-2" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Send;
