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

  // 🎯 Grade Logic (TOTAL)
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
    } catch {
      setError("Prediction failed. Try again!");
    }

    setLoading(false);
  };

  // ✅ TOTAL + FEEDBACK TYPE (MAIN FIX)
  const total = Number(internal) + Number(external);

  const feedbackType =
    Number(attendance) < 65
      ? "poor"
      : total >= 80
      ? "excellent"
      : "good";

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

            <p><b>Total:</b> {total}/100</p>
            <p><b>Grade:</b> {getGrade(total)}</p>

            <hr />

            <h4>💡 Feedback</h4>
            <p>
              {feedbackType === "poor" && "Needs improvement ⚠️"}
              {feedbackType === "good" && "Good, but can improve 👍"}
              {feedbackType === "excellent" && "Excellent performance 🚀"}
            </p>

            <hr />

            <h4>🎯 Recommended Courses</h4>

            {feedbackType === "poor" && (
              <div style={styles.courseBox}>
                <p><b>Basics with W3Schools</b> (Beginner)</p>
                <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer" style={styles.link}>
                  Start Learning ▶
                </a>
              </div>
            )}

            {feedbackType === "good" && (
              <div style={styles.courseBox}>
                <p><b>Practice on GeeksforGeeks</b> (Intermediate)</p>
                <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noreferrer" style={styles.link}>
                  Start Learning ▶
                </a>
              </div>
            )}

            {feedbackType === "excellent" && (
              <div style={styles.courseBox}>
                <p><b>Advanced Courses (Coursera)</b> (Advanced)</p>
                <a href="https://www.coursera.org/" target="_blank" rel="noreferrer" style={styles.link}>
                  Start Learning ▶
                </a>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

/* STYLES */
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
    borderRadius: "18px",
    padding: "28px",
  },

  resultCard: {
    width: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    borderLeft: "6px solid #4CAF50",
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
    borderRadius: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
  },

  error: {
    color: "red",
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