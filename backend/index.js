import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import router from "./Routes/user.route.js"

const App = express()

App.use(express.json())

App.use("/backend/user", router)

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to database")
    })
    .catch((err) => {
        console.log("Database connection failed")
        console.log(err.message)
    })

App.listen(3000, () => {
    console.log("Server running on port 3000")
})