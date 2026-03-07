import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
/*
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
});
*/

//routes import 

import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)

export { app };