import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../util/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const styles = {
    nav: {
      backgroundColor: "#3a86ff",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxShadow: "0 3px 10px rgba(58, 134, 255, 0.4)",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "18px",
      transition: "color 0.3s ease",
    },
    button: {
      backgroundColor: "#ff4b5c",
      border: "none",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link} onMouseEnter={e => e.target.style.color = "#dbe2ef"} onMouseLeave={e => e.target.style.color = "#fff"}>
        Dashboard
      </Link>
      <Link to="/expenses" style={styles.link} onMouseEnter={e => e.target.style.color = "#dbe2ef"} onMouseLeave={e => e.target.style.color = "#fff"}>
        Expenses
      </Link>
      <button
        onClick={handleLogout}
        style={styles.button}
        onMouseEnter={e => (e.target.style.backgroundColor = "#e03e4d")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#ff4b5c")}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
