import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/LoginRegister.css";

function Login() {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getUser = async () => {
        const user = await fetch("http://localhost:5001/getUser", {
          method: "POST",
        });
        const resUser = await user.json();
        console.log(resUser);
        setUser(resUser.user);
      };
      getUser();
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }, []);

  const handleLogin = () => {
    auth.login(user);
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
        <form className="form-body" action="/login/password" method="POST">
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
            />
          </div>
          <button onClick={handleLogin} type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
