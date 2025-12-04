import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import  authRouter  from "./routes/auth_routes.js"
import { connectToDB } from "./DB/mongoose.js"
import cors from "cors";

// use package dotenv
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// use middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors());

app.use('/auth' , authRouter )

// use DB
connectToDB()

// export default app;

app.listen( port , ()=>{
    console.log(`app is running on port : ${port}`)
})

