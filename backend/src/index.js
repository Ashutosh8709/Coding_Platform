import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./config/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    console.log("MONGODB connected successfuly!!");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on the port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERRR", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!", err);
  });
