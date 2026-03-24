import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./assets/pages/HomePage";
import Dashboard from "./assets/pages/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./assets/pages/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./assets/pages/RegisterPage";
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
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
