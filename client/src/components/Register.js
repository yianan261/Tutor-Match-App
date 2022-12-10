import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/LoginRegister.css";

/**
 * Amanda Au-Yeung
 * registers user with the email and pw to passport, session
 * @returns jsx of registration form
 */
function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    handleRegister();
    const resRegUser = await res.json();
    alert(resRegUser.message);
  };

  const onInputChange = (evt) => {
    const { value, name } = evt.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(evt);
  };

  const validateInput = (evt) => {
    let { name, value } = evt.target;
    setError((prev) => {
      const obj = { ...prev, [name]: "" };
      if (user.password && value !== user.password) {
        obj[name] = "The confirmed password does not match with the password";
      }
      return obj;
    });
  };

  const handleRegister = () => {
    navigate("/login", { replace: true });
  };

  return (
    <main className="card" id="signupCard">
      <div className="alternate-text">
        <Link id="sign-in" to="/login">
          <div>Already have an account?</div>
          <div>Sign In</div>
        </Link>
      </div>
      <div className="signUp-title">
        <h1 className="card-title" id="signUp">
          Sign Up
        </h1>
      </div>
      <div className="log-reg-body">
        <form className="form-body" onSubmit={createUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email"
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
            <label htmlFor="inputPassword5">Password</label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <div htmlFor="inputPassword5">Confirm Password</div>
            <input
              type="password"
              id="inputConfirmedPassword5"
              className="form-control"
              placeholder="Confirm your password"
              name="confirmedPassword"
              value={user.confirmedPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
            {error.confirmedPassword && (
              <span className="err">{error.confirmedPassword}</span>
            )}
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}

Register.protTypes = {};

export default Register;
