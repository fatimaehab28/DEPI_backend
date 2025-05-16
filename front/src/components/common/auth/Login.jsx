import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef({ email: null, password: null });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };

    try {
      const res = await api.post("/Auth/login", payload);
      localStorage.setItem("token", res.data.token);
      const user = jwtDecode(res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" ref={(el) => (formRef.current.email = el)} />
        <input type="password" placeholder="Password" ref={(el) => (formRef.current.password = el)} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
          Sign up
        </span>
      </p>
    </div>
  );
}
