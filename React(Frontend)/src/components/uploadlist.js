import React from "react";
import { useEffect } from "react";
import { useState } from "react";
const UploadList = () => {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchuploadfiles = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/fetchuploadedfiles",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.log("Error occured in upload list");
      }
    };
    fetchuploadfiles();
  }, []);
  return (
    <div className="uloadlist">
      <h2 className="text-center">Uploaded Files</h2>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {files.map((files, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{files.name}</td>
                <td>{files.type}</td>
                <td>{files.date}</td>
                <td>{files.time}</td>
                <td>
                  {/* Download Button */}
                  <a
                    href={`http://localhost:3000/downloadupload/${files._id}`}
                    download
                  >
                    <button className="btn btn-primary">Download</button>
                  </a>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadList;
