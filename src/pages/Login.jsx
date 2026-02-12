import React, { useState } from "react";

function Login() {

  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email1);
    console.log("Password:", password1);
    alert("Login Clicked!");
  };

  return (
    <div style={{ width: "300px", margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: "15px", padding: "8px 20px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;