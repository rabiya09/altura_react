import { useState } from "react";
import { useParams, useLocation, useNavigate  } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();   
  let { returnUrl } = useParams();
  const lvp = localStorage.getItem('lvp');
  const queryParams = new URLSearchParams(useLocation().search);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (username === "rabiya" && password === "pass") {
      localStorage.setItem('authenticated', 'true');
      navigate(lvp ? lvp : '/');     
    } else {
      localStorage.setItem('authenticated', 'false');
      alert("Invalid username or password");      
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};