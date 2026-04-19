import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://smartlearn-backend-1-etsn.onrender.com";
  
  // 🔐 LOGIN
  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data);
      localStorage.setItem("username", username);

      setIsLoggedIn(true);
      navigate("/department");
    } catch (err) {
      if (err.response && err.response.data) {

        if (err.response.data.includes("User not found")) {
          setError("User not found. Please register first.");
        } else if (err.response.data.includes("Invalid password")) {
          setError("Wrong password ❌");
        } else {
          setError(err.response.data);
        }

      } else {
        setError("Server error. Try again.");
      }
    }

    setLoading(false);
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
      });

      setMessage("Registered successfully! Now login ✅");
      setIsRegister(false);

    } catch (err) {

  if (err.response && err.response.data) {

    const errorData = err.response.data;

    // 🔥 If backend sends string
    if (typeof errorData === "string") {

      if (errorData.includes("User not found")) {
        setError("User does not exist ❌");
      } 
      else if (errorData.includes("Invalid password")) {
        setError("Wrong password ❌");
      } 
      else {
        setError(errorData);
      }

    } 
    // 🔥 If backend sends object
    else if (typeof errorData === "object") {
      setError(errorData.message || "Login failed ❌");
    }

  } else {
    setError("Server error. Try again later.");
  }
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1>🎓 SmartLearn</h1>
        <p style={{ color: "gray" }}>E-Learning Platform and Performance Predictor</p>

        <h2>{isRegister ? "Register" : "Login"}</h2>
        
        <input
          style={styles.input}
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister ? (
          <button style={styles.button} onClick={handleRegister}>
            {loading ? "Registering..." : "Register"}
          </button>
        ) : (
          <button style={styles.button} onClick={handleLogin}>
            {loading ? "Logging in..." : "Login"}
          </button>
        )}

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <p style={{ marginTop: "15px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            style={styles.link}
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setMessage("");
            }}
          >
            {isRegister ? " Login" : " Register"}
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #4CAF50, #81C784)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    width: "320px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
  link: {
    color: "#4CAF50",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;