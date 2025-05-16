import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "../../../api/axios";

import { api } from "../../../api/axios";


export default function SignUp() {
  const navigate = useNavigate();
  const formRef = useRef({ name: null, email: null, password: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      userTypeId: 2,
    };

    try {

      await api.post("/Auth/register", payload);  
      //await axios.post("/Auth/register", payload);
      setSuccess("Registered! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" ref={(el) => (formRef.current.name = el)} />
        <input type="email" placeholder="Email" ref={(el) => (formRef.current.email = el)} />
        <input type="password" placeholder="Password" ref={(el) => (formRef.current.password = el)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>Login</span></p>
    </div>
  );
}
