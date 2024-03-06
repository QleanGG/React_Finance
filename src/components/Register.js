import React, { useState } from "react";
import axios from "axios";
import "./formStyle.css";
import { MY_SERVER } from "../services/server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/;

    if (!passwordRegex.test(password)) {
      // If password doesn't meet the criteria, display an error message and stop the form submission
      toast.error(
        "Password must be at least 8 characters long and include both numbers and letters."
      );
      return;
    }
    try {
      const res = await axios.post(`${MY_SERVER}/register`, {
        username,
        email,
        password,
      });
      toast.success(res.data.message);
      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="search-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
