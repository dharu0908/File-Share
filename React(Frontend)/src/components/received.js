import React, { useState, useEffect } from "react";
const Received = () => {
  const handleDownload = async (file) => {
    console.log(`file name is ${file.name}`);

    try {
      const response = await fetch(`http://127.0.0.1:3000/filess/${file._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [files, setfiles] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchfiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/fetchfiles", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setfiles(data);
      } catch (error) {
        alert(`Error have occured ${error}`);
      }
    };
    fetchfiles();
  }, []);
  return (
    <div className="uloadlist">
      <h2 className="text-center">Received Files</h2>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Received From</th>
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
                <td>{files.filetype}</td>
                <td>{files.sentby}</td>
                <td>{files.date}</td>
                <td>{files.time}</td>
                <td>
                  {/* Download Button */}
                  <a
                    href={`http://localhost:3000/download/${files._id}`}
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

export default Received;
