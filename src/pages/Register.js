import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  localStorage.removeItem("isLogin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:3000/profile", {
        name: user.name,
        password: user.password,
      });

      if (res.status === 200) {
        setUser("");
        navigate("/");
      } else {
        alert("Not a registered user");
        setUser("");
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
        <h1 className="login">Register</h1>{" "}
        <div className="form-text">
          <label htmlFor="input">Username</label>
          <input
            type="text"
            id="input"
            name="name"
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
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            autoFocus
            className="login-input"
          />
          <button type="submit">Submit</button>
        </div>
        <Link to="/">Already a User? Login</Link>
      </form>
    </div>
  );
};

export default Register;
