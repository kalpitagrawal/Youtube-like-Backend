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

/*ApiError just creates a structured error object with statusCode, message etc. It doesn't do anything on its own — it just standardizes how errors look.
Something still needs to catch that error and send the response back to the client:
javascript// Without central middleware, who sends this response?
throw new ApiError(404, "User not found"); // just throws... and then what?
```

**The flow is:**
```
throw new ApiError(404, "User not found")
        ↓
Express catches it automatically
        ↓
Passes it to error middleware (err, req, res, next)
        ↓
Middleware sends the response to client */

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode).json({
//         success: false,
//         message: err.message,
//         errors: err.errors
//     });
// });

//routes import 

import userRouter from "./routes/user.routes.js"
import tweetRouter from "./routes/tweet.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter);

export { app };