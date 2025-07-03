import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = ({ onSelect }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Remove token or user session data
      localStorage.removeItem("token");

      navigate("/home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="container ">
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/home"
            onClick={() => onSelect("Home")}
          >
            FileShare
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                  onClick={() => onSelect("Home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/home"
                  onClick={() => onSelect("Upload")}
                >
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/home"
                  onClick={() => onSelect("Send")}
                >
                  SendTo
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/home"
                  onClick={() => onSelect("Received")}
                >
                  Received
                </Link>
              </li>
            </ul>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i> Profile
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/home"
                    onClick={() => onSelect("Profile")}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
