import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth.js"; // Your Auth component
import Home from "./components/home.js"; // Your Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} /> {/* Route for Home */}
      </Routes>
    </Router>
  );
}

export default App;
