import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
function App() {
  return (
    <div className="h-screen flex flex-col bg-bg text-text">
      <BrowserRouter>
        <AuthProvider>
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/teams"
                element={
                  <ProtectedRoutes>
                    <TeamsPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/team/:id"
                element={
                  <ProtectedRoutes>
                    <TeamPage />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
