import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../../components/ErrorAlert";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    clearError();
  }, []);
  return (
    <div className="h-full overflow-hidden flex flex-col justify-center place-items-center">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-col justify-center place-items-center">
        <h1 className="font-bold text-2xl mb-8">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <fieldset
            onSubmit={handleSubmit}
            className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-4 "
          >
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              onChange={(p) => setPassword(p.target.value)}
            />
            {error && (
              <p>
                <ErrorAlert message={error} className="mt-2" />
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral mt-4 border border-border hover:border-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </fieldset>
        </form>
        <a
          className="mt-6 hover:underline hover:cursor-pointer"
          href="/register"
        >
          Don't have an account?
        </a>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
