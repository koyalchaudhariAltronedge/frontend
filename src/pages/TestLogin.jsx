import { useState } from "react";
import axios from "axios";

function TestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const testApi = async () => {
    try {
      const res = await axios.post("http://localhost:8088/api/login", {
        email,
        password
      });

      setResult(JSON.stringify(res.data));
    } catch (err) {
      setResult("Error: API not working");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Test Login API</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> <br/><br/>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br/><br/>

      <button onClick={testApi}>Test API</button>

      <p>Result: {result}</p>
    </div>
  );
}

export default TestLogin;