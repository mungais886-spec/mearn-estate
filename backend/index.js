import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./Routes/user.route.js";
import authRoute from "./Routes/auth.route.js";
import cors from 'cors';


const App = express();
App.use(express.json());


App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
App.use("/backend/user", router);
App.use("/backend/auth", authRoute);
App.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "internal server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err.message);
  });

App.listen(3000, () => {
  console.log("Server running on port 3000");
});
