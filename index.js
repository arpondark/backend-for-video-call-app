import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
