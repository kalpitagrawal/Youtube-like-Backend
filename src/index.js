dotenv.config({
    path: "./.env"  
})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Eroor:", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is Running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongo db connection failed !!! ", err);
    });