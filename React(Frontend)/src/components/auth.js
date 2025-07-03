import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import

const Auth = () => {
  const [selectedOption, setSelectedOption] = useState("option1"); // Default selection
  const navigate = useNavigate(); // Hook for navigation

  const [logindata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setregisterData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const token = data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch {
      alert("Error");
    }
    // Redirect to home after login
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("Error");
      }
    } catch {
      alert("Error");
    }

    // Handle sign-up logic here
    // Redirect to home after sign-up
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Welcome to the Data Sharing Platform</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option1"
          autoComplete="off"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        <label className="btn btn-outline-primary mx-2" htmlFor="option1">
          Login
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option2"
          autoComplete="off"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
        <label className="btn btn-outline-primary mx-2" htmlFor="option2">
          Sign Up
        </label>
      </div>

      {selectedOption === "option1" ? (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...logindata, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPasswordLogin" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordLogin"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setFormData({ ...logindata, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="btn btn-primary w-100"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title text-center">Sign Up</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setregisterData({ ...registerData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmailRegister" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmailRegister"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setregisterData({ ...registerData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPasswordRegister" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordRegister"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setregisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary w-100"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
