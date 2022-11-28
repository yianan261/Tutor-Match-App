import express from "express";
import { login, getUser, logOut } from "../controllers/login.js";

// Amanda Au-Yeung

const router = express.Router();

// login
router.post("/api/login/password", login);

// get users
router.get("/api/getUser", getUser);

// logout
router.post("/api/logout", logOut);

export default router;
