import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categorySummary, setCategorySummary] = useState({});
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Expected array of expenses");

      setExpenses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch expenses.");
    }
  };

  const filterExpensesByTime = (allExpenses, type) => {
    const now = new Date();
    return allExpenses.filter((item) => {
      const date = new Date(item.date);
      if (type === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return date >= oneWeekAgo;
      } else if (type === "month") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
  };

  useEffect(() => {
    const filtered = filterExpensesByTime(expenses, filter);
    setFilteredExpenses(filtered);

    const totalAmt = filtered.reduce((sum, item) => sum + Number(item.amount), 0);
    setTotal(totalAmt);

    const grouped = filtered.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});
    setCategorySummary(grouped);
  }, [expenses, filter]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDownloadCSV = () => {
    const rows = [["Date", "Category", "Amount"]];
    filteredExpenses.forEach((e) => {
      const formattedDate = new Date(e.date).toISOString().split("T")[0];
      rows.push([formattedDate, e.category, e.amount]);
    });

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const recentTransactions = [...filteredExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const chartData = {
    labels: Object.keys(categorySummary),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categorySummary),
        backgroundColor: "rgba(58, 134, 255, 0.6)", // calm blue
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#334e68" } },
      title: { display: true, text: "Spending by Category", color: "#334e68" },
    },
    scales: {
      x: { ticks: { color: "#334e68" } },
      y: { ticks: { color: "#334e68" } },
    },
  };

  // Inline styles matching Login/Register vibe
  const styles = {
    container: {
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#334e68",
      backgroundColor: "#f0f4f8",
      padding: "24px 28px",
      borderRadius: "14px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
    header: {
      marginBottom: "20px",
      fontWeight: "700",
      fontSize: "28px",
    },
    error: {
      color: "#d9534f", // bootstrap danger red
      marginBottom: "16px",
    },
    filterRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      gap: "12px",
      flexWrap: "wrap",
    },
    select: {
      padding: "10px 12px",
      borderRadius: "8px",
      border: "1.5px solid #a9c0d9",
      backgroundColor: "#fff",
      color: "#334e68",
      fontSize: "16px",
      outline: "none",
      cursor: "pointer",
    },
    button: {
      padding: "10px 18px",
      backgroundColor: "#3a86ff",
      border: "none",
      borderRadius: "10px",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 4px 12px #3a86ff99",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#265cbf",
    },
    total: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "24px",
    },
    noExpenses: {
      fontStyle: "italic",
      color: "#7a869a",
    },
    recentTitle: {
      marginTop: "40px",
      marginBottom: "16px",
      fontSize: "22px",
      fontWeight: "700",
    },
    recentList: {
      listStyleType: "none",
      paddingLeft: "0",
      color: "#334e68",
    },
    recentItem: {
      marginBottom: "10px",
      fontSize: "16px",
      borderBottom: "1px solid #dbe2ef",
      paddingBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dashboard</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.filterRow}>
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">This Month</option>
        </select>

        <button
          onClick={handleDownloadCSV}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          type="button"
        >
          Download CSV
        </button>
      </div>

      <p style={styles.total}>
        <strong>Total Expenses:</strong> ₹{total}
      </p>

      {filteredExpenses.length === 0 ? (
        <p style={styles.noExpenses}>No expenses to display for this period.</p>
      ) : (
        <div style={{ maxWidth: "600px", marginTop: "30px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      <h3 style={styles.recentTitle}>Recent Transactions</h3>
      <ul style={styles.recentList}>
        {recentTransactions.map((e) => (
          <li key={e._id} style={styles.recentItem}>
            {new Date(e.date).toLocaleDateString()} - {e.category}: ₹{e.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
