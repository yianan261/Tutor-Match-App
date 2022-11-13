import express from "express";
const app = express();
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
require("./config/passport")(app);
// import register from "./routes/register";
// import login from "./routers/login";
// import auth from "./routes/auth";
import session from "express-session";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const PORT = process.env.PORT || 5001;

// use passport here
// export default = (passport) => {
  
// }

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  // store: 
}));

app.use(passport.authenticate('session'));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
