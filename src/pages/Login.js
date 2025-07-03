import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../util/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Login failed");
      }

      const data = await res.json();
      setToken(data.token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      alert(err.message);
    }
  };

  // Inline styles
  const styles = {
    form: {
      maxWidth: "350px",
      margin: "80px auto",
      padding: "30px",
      backgroundColor: "#f0f4f8", // light cool blue-gray
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#334e68",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    input: {
      padding: "12px 15px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1.5px solid #a9c0d9",
      outline: "none",
      transition: "border-color 0.3s ease",
      backgroundColor: "#ffffff",
      color: "#334e68",
    },
    inputFocus: {
      borderColor: "#3a86ff",
      boxShadow: "0 0 6px #3a86ff55",
    },
    button: {
      padding: "14px",
      fontSize: "17px",
      fontWeight: "600",
      color: "#fff",
      backgroundColor: "#3a86ff", // cool blue
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 4px 12px #3a86ff99",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#265cbf",
    },
    paragraph: {
      fontSize: "14px",
      textAlign: "center",
      color: "#617d98",
    },
    link: {
      color: "#3a86ff",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  // To add simple focus effect for inputs, we'll need a small workaround
  // But since inline styles can't handle pseudo-classes easily,
  // I'll keep it simple here.

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.form}
      autoComplete="off"
    >
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
      <p style={styles.paragraph}>
        Not registered?{" "}
        <Link to="/register" style={styles.link}>
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default Login;
