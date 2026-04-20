import express from "express"
import {config} from "dotenv"
import {connectDB,disconnectDB} from "./config/db.js"



//importing routes
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"



config() // Load environment variables from .env file
connectDB();

const app = express()
const PORT = 5001


process.on("uncaughtException",(error)=>{
    console.error("Uncaught Exception:", error);
    disconnectDB().then(()=>{
        process.exit(1); // Exit the process with an error code
    });
})

process.on("unhandledRejection",(reason,promise)=>{
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    disconnectDB().then(()=>{
        process.exit(1); // Exit the process with an error code
    });
})

process.on("SIGINT",()=>{
    console.log("SIGINT received. Shutting down gracefully...");
    disconnectDB().then(()=>{
        process.exit(0); // Exit the process with a success code
    });
})

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/movies",movieRoutes)
app.use("/auth",authRoutes)


const server = app.listen(PORT, ()=>{
    console.log(`Server started......... at port ${PORT}`);
    
})