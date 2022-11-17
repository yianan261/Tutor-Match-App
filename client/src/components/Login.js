import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "../assets/styles/LoginRegister.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const getUser = async (e) => {
    e.preventDefault();
    console.log("user email", user.email);
    console.log("user pw", user.password);
    const loginUser = await fetch("/login/password"
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      credentials: "include",
    });
    const resUser = await loginUser.json();
    if (resUser.status === "ok") {
      handleLogin();
    } else {
      alert(resUser.message);
    }
  }

  const onInputChange = (evt) => {
    const { value, name } = evt.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    auth.login("user");
    navigate("/profile", { replace: true });
  };

  return (
    <div className="card">
      <h5 className="card-title">Sign In</h5>
      <p id="no-ac">No Account?</p>
      <Link id="reg-link" to="/register">
        Sign Up!
      </Link>
      <div className="card-body">
        <form className="form-body" onSubmit={getUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              value={user.email}
              onChange={onInputChange}
              name="email"
              required
            />
            <div id="emailHelp" className="form-text">
              We will never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              value={user.password}
              onChange={onInputChange}
              name="password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
