import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user_routes.js"
import homeRouter from "./routes/home_routes.js"
import { connectToDB } from "./DB/mongoose.js"
import cors from "cors";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger.js" 
import "./config/cloudinary.js";

// use package dotenv
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// use middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRouter)
app.use('/home', homeRouter)

app.get('/', (req, res) => {
  res.send('Server is running')
})

connectToDB()

export default app;

