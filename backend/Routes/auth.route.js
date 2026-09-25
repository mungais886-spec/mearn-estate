import express from "express";
import { signin, signup, google } from "../contorllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.post("/google", google);

export default authRoute;