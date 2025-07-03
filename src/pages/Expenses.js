import React, { useEffect, useState } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    time: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError("Failed to fetch expenses.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/expenses/${editingId}`
        : "http://localhost:5000/expenses";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save expense");
      }

      setForm({ title: "", amount: "", category: "", date: "", time: "" });
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (exp) => {
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      time: exp.time,
    });
    setEditingId(exp._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete expense");

      fetchExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "24px 28px",
      backgroundColor: "#f0f4f8",
      borderRadius: "14px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#334e68",
    },
    header: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
    },
    error: {
      color: "#d9534f",
      marginBottom: "16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "30px",
    },
    input: {
      padding: "12px 14px",
      borderRadius: "10px",
      border: "1.5px solid #a9c0d9",
      fontSize: "16px",
      outline: "none",
      color: "#334e68",
      backgroundColor: "#fff",
    },
    buttonRow: {
      display: "flex",
      gap: "16px",
      marginTop: "8px",
    },
    button: {
      padding: "12px 22px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      boxShadow: "0 4px 12px rgba(58, 134, 255, 0.5)",
      color: "#fff",
      backgroundColor: "#3a86ff",
      transition: "background-color 0.3s ease",
    },
    cancelButton: {
      backgroundColor: "#a0a0a0",
      boxShadow: "none",
    },
    expenseList: {
      listStyle: "none",
      paddingLeft: 0,
      color: "#334e68",
    },
    expenseItem: {
      marginBottom: "12px",
      paddingBottom: "12px",
      borderBottom: "1px solid #dbe2ef",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      fontSize: "16px",
    },
    expenseInfo: {
      flex: "1 1 auto",
      minWidth: "220px",
    },
    expenseButtons: {
      display: "flex",
      gap: "8px",
    },
    smallButton: {
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      boxShadow: "0 3px 8px rgba(58, 134, 255, 0.5)",
      color: "#fff",
      backgroundColor: "#3a86ff",
      transition: "background-color 0.3s ease",
    },
    smallButtonDelete: {
      backgroundColor: "#d9534f",
      boxShadow: "0 3px 8px rgba(217, 83, 79, 0.5)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{editingId ? "Edit Expense" : "Add Expense"}</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          style={styles.input}
          min="0"
          step="0.01"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>
            {editingId ? "Update" : "Add"} Expense
          </button>
          {editingId && (
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={() => {
                setForm({ title: "", amount: "", category: "", date: "", time: "" });
                setEditingId(null);
                setError("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul style={styles.expenseList}>
        {expenses.map((exp) => (
          <li key={exp._id} style={styles.expenseItem}>
            <div style={styles.expenseInfo}>
              <strong>{exp.title}</strong> ₹{exp.amount} — {exp.category} on{" "}
              {new Date(exp.date).toLocaleDateString()} at {exp.time}
            </div>
            <div style={styles.expenseButtons}>
              <button
                onClick={() => handleEdit(exp)}
                style={styles.smallButton}
                type="button"
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#265cbf")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#3a86ff")}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                style={{ ...styles.smallButton, ...styles.smallButtonDelete }}
                type="button"
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#b52a27")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#d9534f")}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
