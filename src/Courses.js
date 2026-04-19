import React from "react";

function Courses({ department }) {
  const courseData = {
    CSE: [
      {
        name: "Java",
        video: "https://www.w3schools.com/java/",
        theory: "https://www.geeksforgeeks.org/java/",
      },
      {
        name: "Python",
        video: "https://www.w3schools.com/python/",
        theory:
          "https://www.geeksforgeeks.org/python-programming-language/",
      },
      {
        name: "JavaScript",
        video: "https://www.w3schools.com/js/",
        theory: "https://www.geeksforgeeks.org/javascript/",
      },
      {
        name: "Machine Learning",
        video:
          "https://www.w3schools.com/python/python_ml_getting_started.asp",
        theory: "https://www.geeksforgeeks.org/machine-learning/",
      },
      {
        name: "Data Structures",
        video: "https://www.w3schools.com/dsa/index.php",
        theory: "https://www.geeksforgeeks.org/data-structures/",
      },
      {
        name: "C Programming",
        video: "https://www.w3schools.com/c/",
        theory:
          "https://www.geeksforgeeks.org/c-programming-language/",
      },
      {
        name: "HTML & CSS",
        video: "https://www.w3schools.com/html/",
        theory: "https://www.geeksforgeeks.org/html/",
      },
      {
        name: "SQL",
        video: "https://www.w3schools.com/sql/",
        theory: "https://www.geeksforgeeks.org/sql/",
      },
    ],

    AIML: [
      {
        name: "Python",
        video: "https://www.w3schools.com/python/",
        theory:
          "https://www.geeksforgeeks.org/python-programming-language/",
      },
      {
        name: "Machine Learning",
        video:
          "https://www.w3schools.com/python/python_ml_getting_started.asp",
        theory: "https://www.geeksforgeeks.org/machine-learning/",
      },
      {
        name: "Deep Learning",
        video:
          "https://www.w3schools.com/python/python_ml_getting_started.asp",
        theory: "https://www.geeksforgeeks.org/deep-learning/",
      },
      {
        name: "Artificial Intelligence",
        video:
          "https://www.w3schools.com/python/python_ml_getting_started.asp",
        theory:
          "https://www.geeksforgeeks.org/artificial-intelligence/",
      },
      {
        name: "Data Science",
        video: "https://www.w3schools.com/python/pandas/",
        theory: "https://www.geeksforgeeks.org/data-science/",
      },
      {
        name: "Statistics",
        video: "https://www.w3schools.com/python/numpy/",
        theory: "https://www.geeksforgeeks.org/statistics/",
      },
      {
        name: "SQL",
        video: "https://www.w3schools.com/sql/",
        theory: "https://www.geeksforgeeks.org/sql/",
      },
      {
        name: "NLP",
        video:
          "https://www.w3schools.com/python/python_ml_getting_started.asp",
        theory:
          "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/",
      },
    ],

    ECE: [
      {
        name: "Digital Electronics",
        video:
          "https://www.coursera.org/search?query=digital%20electronics",
        theory:
          "https://www.coursera.org/search?query=digital%20electronics",
      },
      {
        name: "Analog Electronics",
        video:
          "https://www.coursera.org/search?query=analog%20electronics",
        theory:
          "https://www.coursera.org/search?query=analog%20electronics",
      },
      {
        name: "Signals & Systems",
        video:
          "https://www.coursera.org/search?query=signals%20and%20systems",
        theory:
          "https://www.coursera.org/search?query=signals%20and%20systems",
      },
      {
        name: "Microprocessors",
        video:
          "https://www.coursera.org/search?query=microprocessors",
        theory:
          "https://www.coursera.org/search?query=microprocessors",
      },
      {
        name: "VLSI Design",
        video:
          "https://www.coursera.org/search?query=vlsi%20design",
        theory:
          "https://www.coursera.org/search?query=vlsi%20design",
      },
      {
        name: "Embedded Systems",
        video:
          "https://www.coursera.org/search?query=embedded%20systems",
        theory:
          "https://www.coursera.org/search?query=embedded%20systems",
      },
      {
        name: "Communication Systems",
        video:
          "https://www.coursera.org/search?query=communication%20systems",
        theory:
          "https://www.coursera.org/search?query=communication%20systems",
      },
      {
        name: "Control Systems",
        video:
          "https://www.coursera.org/search?query=control%20systems",
        theory:
          "https://www.coursera.org/search?query=control%20systems",
      },
    ],
  };

  const courses = courseData[department] || [];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        📚 Explore {department} Courses
      </h2>

      <div style={styles.grid}>
        {courses.map((course, index) => (
          <div key={index} style={styles.card}>
            <h3>{course.name}</h3>

            <button
              style={styles.btn}
              onClick={() => window.open(course.video, "_blank")}
            >
              📺 Learn with Videos
            </button>

            <button
              style={{ ...styles.btn, background: "#2196F3" }}
              onClick={() => window.open(course.theory, "_blank")}
            >
              📘 Read Theory
            </button>
          </div>
        ))}

        {/* Explore More */}
        <div style={styles.exploreCard}>
          <h3>🌐 Explore More</h3>

          <button
            style={styles.btn}
            onClick={() =>
              window.open(
                department === "ECE"
                  ? "https://www.coursera.org/"
                  : "https://www.w3schools.com/",
                "_blank"
              )
            }
          >
            📺 {department === "ECE" ? "Coursera" : "W3Schools"}
          </button>

          <button
            style={{ ...styles.btn, background: "#2196F3" }}
            onClick={() =>
              window.open(
                department === "ECE"
                  ? "https://www.coursera.org/"
                  : "https://www.geeksforgeeks.org/",
                "_blank"
              )
            }
          >
            📘 {department === "ECE"
              ? "Coursera"
              : "GeeksforGeeks"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  heading: {
    marginBottom: "10px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  exploreCard: {
    background: "#f1f8e9",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    border: "2px dashed #4CAF50",
  },

  btn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #4CAF50, #66BB6A)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Courses;