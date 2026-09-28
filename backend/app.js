import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import helmet from "helmet"
import cors from "cors"

import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import competitionRoutes from "./routes/competitionRoutes.js"
import participationRoutes from "./routes/participationRoutes.js"

import gloablErrorHandler from './middlewares/globalErrorMid.js'


const app = express()
app.use(helmet())
app.use(cors({
    origin:[process.env.FRONTEND_URL, "http://localhost:5000"]
})) // conncection with frontend
app.use(express.json())

connectDB() // db conncection 
app.use("/api/user", userRoutes) // User
app.use("/api/competition", competitionRoutes) // Competition
app.use("/api/participation", participationRoutes) // Participation

app.get("/", (req, res, next) => {
    res.send(
        "<h1>Freedants-Competition Server Running..</h1>"
    )
})

app.use(gloablErrorHandler) // Global error middleware

export default app