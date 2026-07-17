import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  function handleLogin() {
    if (password === "123456") {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");
    } else {
      alert("Wrong Password");
    }
  }

  return (
    <div>
      <h1>Admin Login</h1>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default AdminLogin;