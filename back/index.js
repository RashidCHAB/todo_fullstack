import mongoose, { Mongoose } from "mongoose";
import dontenv from 'dotenv'
import  express  from "express";
import router from './routes/index.js'
import cors from 'cors'
import morgan from "morgan"
dontenv.config()
const { MONGO__SERVER, PORT } = process.env

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))

const connetionAndStartServer = async () => {
    try {
        await mongoose.connect(MONGO__SERVER)

        app.listen(PORT, () => {
            console.log(`App succesfully started at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`Application launch error`)
    }
}
connetionAndStartServer()