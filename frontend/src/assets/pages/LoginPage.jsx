import React from "react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const { handleLogin, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center place-items-center ">
      <h1 className="font-bold text-2xl mb-8">LOGIN</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center place-items-center gap-4 w-[50%]"
      >
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-border w-[40%]"
        />
        <input
          type="password"
          onChange={(p) => setPassword(p.target.value)}
          className="border-2 border-border w-[40%]"
        />
        {error && <p>Error: {error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="border-4 border-border w-fit p-2 rounded-2xl"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
