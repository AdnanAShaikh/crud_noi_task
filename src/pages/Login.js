import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  localStorage.removeItem("isLogin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/profile");

      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        console.log(user);
        if (data.name === user.name || data.password === user.password) {
          localStorage.setItem("isLogin", true);
          setUser("");
          navigate("/home");
        } else {
          alert("Not a registered user");
          setUser("");
        }
      }
    } catch (error) {
      console.log(error);
      setUser("");
    }
  };

  const handleChange = (e) => {
    setUser((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="login">Login</h1>{" "}
        <div className="form-text">
          <label htmlFor="input">Username</label>
          <input
            type="text"
            name="name"
            id="input"
            value={user.name}
            onChange={handleChange}
            required
            autoFocus
            className="login-input"
          />

          <label htmlFor="input">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
            autoFocus
            className="login-input"
          />
          <button type="submit">Submit</button>
        </div>
        <Link to="/register">Not A User? Register</Link>
      </form>
    </div>
  );
};

export default Login;
