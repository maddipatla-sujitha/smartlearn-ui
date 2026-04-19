import React from "react";
import { useNavigate } from "react-router-dom";

function DepartmentPage() {
  const navigate = useNavigate();

  const selectDepartment = (dept) => {
    localStorage.setItem("department", dept);
    navigate("/dashboard");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },

    card: {
      width: "100%",
      maxWidth: "520px",
      background: "white",
      borderRadius: "18px",
      padding: "35px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      textAlign: "center",
    },

    title: {
      fontSize: "34px",
      marginBottom: "10px",
      color: "#222",
    },

    subtitle: {
      color: "#666",
      marginBottom: "28px",
    },

    grid: {
      display: "grid",
      gap: "15px",
    },

    button: {
      padding: "16px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Select Department</h1>
        <p style={styles.subtitle}>
          Choose your department to continue
        </p>

        <div style={styles.grid}>
          <button style={styles.button} onClick={() => selectDepartment("CSE")}>
            💻 Computer Science Engineering
          </button>

          <button style={styles.button} onClick={() => selectDepartment("ECE")}>
            📡 Electronics & Communication Engineering
          </button>

          <button style={styles.button} onClick={() => selectDepartment("AIML")}>
            🤖 Artificial Intelligence & ML
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;