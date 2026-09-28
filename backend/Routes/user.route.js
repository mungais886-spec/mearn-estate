import express from "express";
import {
  test,
  updateUser,
  signOut,
  deleteUser,
} from "../contorllers/user.controllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.post("/update/:id", verifyUser, updateUser);

router.post("/signout", signOut);

router.delete("/delete/:id", verifyUser, deleteUser);

export default router;