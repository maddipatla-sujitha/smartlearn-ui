function Navbar({ onLogout }) {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>SmartLearn</h2>

      <div style={styles.right}>
        <span style={styles.user}>
          👋 {localStorage.getItem("name")}
        </span>

        <button style={styles.btn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },
  logo: {
    fontWeight: "600",
    letterSpacing: "1px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  user: {
    color: "#555",
  },
  btn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;