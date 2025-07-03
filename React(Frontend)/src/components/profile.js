import React, { useEffect, useState } from "react";

const Profile = ({ onSelect }) => {
  const [totalupload, setupload] = useState();
  const [totalreceived, setreceived] = useState();
  const [totalsent, setsent] = useState();
  useEffect(() => {
    const profilefun = async () => {
      const token = localStorage.getItem("token");
      console.log(` token is ${token}`);
      try {
        const response = await fetch("http://127.0.0.1:3000/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setupload(data.totalupload);
        setreceived(data.totalreceived);
        setsent(data.totalsent);
      } catch (error) {
        console.log("error in profile");
      }
    };
    profilefun();
  }, []);
  return (
    <div className="profile">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            <strong>Profile</strong>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            Total Uploads : {totalupload}
            <button
              type="button"
              className="btn btn-primary text-right"
              onClick={() => {
                onSelect("UploadList");
              }}
            >
              View
            </button>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            Total Received Files : {totalreceived}
            <button
              type="button"
              className="btn btn-primary text-right"
              onClick={() => {
                onSelect("Received");
              }}
            >
              View
            </button>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            Total Send Items : {totalsent}
            <button
              type="button"
              className="btn btn-primary text-right"
              onClick={() => {
                onSelect("SendList");
              }}
            >
              View
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
