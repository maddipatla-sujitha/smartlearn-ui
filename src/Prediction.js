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

  // Grade Function
  const getGrade = (score) => {
    if (score >= 90) return "S";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "Fail";
  };

  // Attendance Status
  const getAttendanceStatus = (attendance) => {
    if (attendance >= 75) return "Eligible ✅";
    if (attendance >= 65) return "Condonation ⚠️";
    return "Not Eligible ❌";
  };

  // Feedback Function
  const getFeedback = (attendance, total) => {
    if (attendance < 65) return "Low attendance! Improve immediately 📉";
    if (total<50) return "Focus more on academics 📚";
    if (total >= 80) return "Excellent performance 🚀";
    return "Good, but can improve 👍";
  };

  // Predict Function
  const handlePredict = async () => {
    setLoading(true);
    setError("");

    if (!subject) {
      setError("Please select subject ⚠️");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/predict`, {
        attendance: Number(attendance),
        internal: Number(internal),
        external: Number(external),
        subject,
        department,
      });

      setResult(response.data);
    } catch (err) {
      setError("Prediction failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.mainWrapper}>
        
        {/* LEFT CARD */}
        <div style={styles.card}>
          <h2 style={styles.heading}>📊 Performance Prediction</h2>

          {/* SUBJECT */}
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

          {/* INPUTS */}
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

            <p><b>Total:</b> {Number(internal) + Number(external)}/100</p>
            <p><b>Grade:</b> {getGrade(Number(internal) + Number(external))}</p>
            <hr />

            <h4>💡 Feedback</h4>
            <p>
              {result.feedback ||
                getFeedback(Number(attendance), 
                Number(internal) + Number(external))
              }
            </p>

            <hr />

            <h4>🎯 Recommended Courses</h4>

            {result.recommendations &&
            result.recommendations.length > 0 ? (
              result.recommendations.map((course, index) => (
                <div key={index} style={styles.courseBox}>
                  <p>
                    <b>{course.title}</b> ({course.level})
                  </p>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    Start Learning ▶
                  </a>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// STYLES
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(to right, #eef2f7, #ffffff)",
  },

  mainWrapper: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  card: {
    width: "420px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  resultCard: {
    width: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #4CAF50",
  },

  heading: {
    marginBottom: "20px",
    color: "#222",
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
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #43a047, #66bb6a)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginTop: "12px",
    fontWeight: "500",
  },

  courseBox: {
    padding: "10px",
    background: "#f5f5f5",
    borderRadius: "10px",
    marginBottom: "12px",
  },

  link: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Prediction;