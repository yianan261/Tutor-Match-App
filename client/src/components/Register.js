import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/LoginRegister.css";

function Register() {
  // const [user, setUser] = useState({}
  // //   {
  // //   email: "",
  // //   password: "",
  // //   confirmedPassword: "",
  // // }
  // );

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();
  // const form = useRef(null);
  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const res = await fetch("http://localhost:5001/register", {
  //         method: "POST",
  //         body: {
  //           email: input.email,
  //           password: input.password
  //         }
  //       });
  //       const resRegUser = await res.json();
  //       setUser(resRegUser.user);
  //     };
  //     fetchData();
  //   } catch (err) {
  //     alert(`Error: ${err}`);
  //   }
  // }, []);

  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //  const emailInput = e.target.email.value;
  //  const passInput = e.target.password.value;
  //  console.log("emailINput",emailInput)
  //  console.log("passwordInput",passInput)
  //   handleRegister()
  //   // console.log(setUser)
  // }

  const createUser = async (e) => {
    e.preventDefault();
    console.log(input.email);
    console.log(input.password);
    const res = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        password: input.password
      })
    });
    console.log("res", res);
    handleRegister();
    const resRegUser = await res.json();
    console.log("USER",resRegUser.message)
    // setUser(resRegUser.user);
  };

  const onInputChange = (evt) => {
    const { value, name } = evt.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(evt);
  };

  const validateInput = (evt) => {
    let { name, value } = evt.target;
    setError((prev) => {
      const obj = { ...prev, [name]: "" };
      if (input.password && value !== input.password) {
        obj[name] = "The confirmed password does not match with the password";
      }
      return obj;
    });
  };

  const handleRegister = () => {
    auth.login(input);
    navigate("/profile", { replace: true });
  };

  return (
    <div className="card">
      <h5 className="card-title">Sign Up</h5>
      <p id="acc-holder">Already have an account?</p>
      <Link id="sign-in" to="/login">
        Sign In
      </Link>
      <div className="container">
        <form  onSubmit={createUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              value={input.email}
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
              aria-describedby="passwordHelpBlock"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword5">Confirm Password</label>
            <input
              type="password"
              id="inputConfirmedPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="Confirm your password"
              name="confirmedPassword"
              value={input.confirmedPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
            {error.confirmedPassword && (
              <span className="err">{error.confirmedPassword}</span>
            )}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
