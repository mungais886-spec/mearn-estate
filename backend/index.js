import "dotenv/config"
import express from "express";
import mongoose from "mongoose";


mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err)
})



const App = express();

App.listen(3000,()=>{
    console.log("Server running in port 3000")
});

