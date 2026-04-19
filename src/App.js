import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import DepartmentPage from "./DepartmentPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* NOT LOGGED IN */}
        {!isLoggedIn ? (
          <>
            <Route
              path="/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </>
        ) : (
          <>
            {/* LOGGED IN */}

            <Route
              path="/"
              element={<Navigate to="/department" />}
            />

            <Route
              path="/department"
              element={<DepartmentPage />}
            />

            <Route
              path="/dashboard"
              element={
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              }
            />

            <Route
              path="*"
              element={<Navigate to="/department" />}
            />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;