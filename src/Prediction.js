import axios from "axios";
import { useState } from "react";

function Prediction({ department }) {
  const [attendance, setAttendance] = useState("");
  const [internal, setInternal] = useState("");
  const [external, setExternal] = useState("");
  const [subject, setSubject] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://smartlearn-backend-1-etsn.onrender.com";

  // ✅ Grade based on TOTAL (out of 100)
  const getGrade = (total) => {
    if (total >= 91) return "S";
    if (total >= 81) return "A";
    if (total >= 71) return "B";
    if (total >= 61) return "C";
    if (total >= 51) return "D";
    return "Reappear";
  };

  const getAttendanceStatus = (attendance) => {
    if (attendance >= 75) return "Eligible ✅";
    if (attendance >= 65) return "Condonation ⚠️";
    return "Not Eligible ❌";
  };

  const getFeedback = (attendance, total) => {
    if (attendance < 65) return "Low attendance! Improve immediately 📉";
    if (total < 50) return "You need serious improvement 📚";
    if (total >= 85) return "Excellent performance 🚀";
    return "Good, but can improve 👍";
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");

    if (!subject) {
      setError("Please select subject ⚠️");
      setLoading(false);
      return;
    }

    const total = Number(internal) + Number(external);

    try {
      const response = await axios.post(`${API_URL}/api/predict`, {
        attendance: Number(attendance),
        internal: Number(internal),
        external: Number(external),
        subject,
        department,
      });

      setResult({ ...response.data, total });
    } catch (err) {
      setResult({ total }); // fallback if API fails
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.mainWrapper}>

        {/* LEFT CARD */}
        <div style={styles.card}>
          <h2 style={styles.heading}>📊 Performance Prediction</h2>

          <select
            style={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>

            {department === "CSE" && (
              <>
                <option>Data Structures</option>
                <option>Java</option>
                <option>DBMS</option>
              </>
            )}

            {department === "ECE" && (
              <>
                <option>Signals</option>
                <option>VLSI</option>
                <option>Embedded Systems</option>
                <option>Digital Electronics</option>
                <option>Communication Systems</option>
              </>
            )}

            {department === "AIML" && (
              <>
                <option>Machine Learning</option>
                <option>Deep Learning</option>
                <option>Python</option>
              </>
            )}
          </select>

          <input
            style={styles.input}
            placeholder="Attendance (%)"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Internal Marks (out of 40)"
            value={internal}
            onChange={(e) => setInternal(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="External Marks (out of 60)"
            value={external}
            onChange={(e) => setExternal(e.target.value)}
          />

          <button style={styles.button} onClick={handlePredict}>
            {loading ? "Predicting..." : "Predict"}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* RIGHT CARD */}
        {result && (
          <div style={styles.resultCard}>
            <h3 style={styles.reportTitle}>📈 Performance Report</h3>

            <p><b>Subject:</b> {subject}</p>
            <p><b>Attendance:</b> {attendance}%</p>
            <p><b>Status:</b> {getAttendanceStatus(Number(attendance))}</p>

            <p><b>Internal Marks:</b> {internal}/40</p>
            <p><b>External Marks:</b> {external}/60</p>

            <p><b>Total:</b> {result.total}/100</p>
            <p><b>Grade:</b> {getGrade(result.total)}</p>

            <hr />

            <h4>💡 Feedback</h4>
            <p>{getFeedback(Number(attendance), result.total)}</p>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    paddingBottom: "20px",
  },

  mainWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    alignItems: "start",
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  resultCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #4CAF50",
  },

  heading: {
    marginBottom: "20px",
  },

  reportTitle: {
    color: "#2e7d32",
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Prediction;