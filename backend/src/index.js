import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import http from "http";
import { initSocket } from "./socket/socket.js";

import connectDB from "./config/db.js";
import { app } from "./app.js";
import { addProblem } from "./data/sampleProblems.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

initSocket(server);

connectDB()
  .then(() => {
    console.log("MONGODB connected successfully!!");
    server.listen(PORT, () => {
      console.log(`Server is running on the port ${PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    // addProblem();
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!", err);
  });
