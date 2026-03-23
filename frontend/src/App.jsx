import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import Dashboard from "./assets/pages/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./assets/pages/LoginPage";
function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
