// import React, { useEffect, useState } from "react";
// import { useAuth } from "../utils/auth";
// import { useNavigate } from "react-router-dom";
// import { response } from "express";

// function Register() {
//   const [user, setUser] = useState("");
//   const auth = useAuth();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//         await fetch("/utils/auth.js");
//         const json = await response.json();
//         setUser(json);
//       };
//       fetchData().catch(console.error);
//   }, []);

//   const handleRegister = () => {
//     auth.login(user);
//     navigate("/profile", { replace: true });
//   };
//   return (
//     <div className="container">
//       <form action="/login/password" method="POST">
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//           />
//           <div id="emailHelp" className="form-text">
//             We will never share your email with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="inputPassword5">Password</label>
//           <input
//             type="password"
//             id="inputPassword5"
//             className="form-control"
//             aria-describedby="passwordHelpBlock"
//           />
//           <small id="passwordHelpBlock" className="form-text text-muted">
//             Your password must be 8-20 characters long, contain letters and
//             numbers, and must not contain spaces, special characters, or emoji.
//           </small>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="inputPassword5">Confirm Password</label>
//           <input
//             type="password"
//             id="inputPassword5"
//             className="form-control"
//             aria-describedby="passwordHelpBlock"
//           />
//         </div>
//         <button
//           onClick={handleRegister}
//           type="submit"
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;
