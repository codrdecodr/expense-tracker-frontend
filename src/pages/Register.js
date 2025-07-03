import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) navigate("/login");
      else throw new Error(data.error || "Registration failed");
    } catch (err) {
      alert(err.message);
    }
  };

  // Styles matching the first login form vibe
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
  };

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
        name="email"
        type="email"
        placeholder="Email"
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
      <button
        type="submit"
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
