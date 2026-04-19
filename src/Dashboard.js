import Navbar from "./Navbar";
import Prediction from "./Prediction";
import Courses from "./Courses";

function Dashboard({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("department");
    setIsLoggedIn(false);
  };

  const department = localStorage.getItem("department");

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
      fontFamily: "Poppins, sans-serif",
    },

    container: {
      padding: "30px",
      maxWidth: "1500px",
      margin: "auto",
    },

    welcomeBox: {
      background: "white",
      padding: "22px",
      borderRadius: "14px",
      marginBottom: "25px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    },

    courseSection: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.page}>
      <Navbar onLogout={handleLogout} />

      <div style={styles.container}>
        <div style={styles.welcomeBox}>
          <h2>
            Welcome, {localStorage.getItem("username")} 👋
          </h2>

          <p style={{ color: "gray" }}>
            Department: {department}
          </p>

          <p>
            Track your performance and explore learning resources
          </p>
        </div>

        {/* Prediction + Report */}
        <Prediction department={department} />

        {/* Courses */}
        <div style={styles.courseSection}>
          <Courses department={department} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;