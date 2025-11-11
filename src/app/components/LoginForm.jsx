import React from "react";

const LoginForm = () => {
  return (
    <form className="flex flex-col place-items-center border-2 p-4 rounded-2xl gap-3 ">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="textField"
        placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="textField"
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        className="textField"
        placeholder="password"
      />
      <button type="submit" name="action" value="google">
        Sign in with google
      </button>
    </form>
  );
};

export default LoginForm;
