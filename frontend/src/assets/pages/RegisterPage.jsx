import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const { register, loading, error } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className="h-full overflow-hidden flex flex-col justify-center place-items-center ">
      <h1 className="font-bold text-2xl mb-8">REGISTER</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center place-items-center gap-4 w-[50%]"
      >
        <input
          type="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-border w-[80%] lg:w-[40%] p-1 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-border w-[80%] lg:w-[40%] p-1 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(p) => setPassword(p.target.value)}
          className="border-2 border-border w-[80%] lg:w-[40%] p-1 rounded-md"
        />
        {error && <p>Error: {error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="border-4 border-border w-fit p-2 rounded-2xl"
        >
          {loading ? "Logging in..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
