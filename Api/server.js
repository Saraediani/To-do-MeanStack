import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./router/Auth.routes.js";
import taskRouter from "./router/Tasks.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/', userRouter, taskRouter)
app.use("*", (req, res) => {
  res.status(404).json({ error: true, message: "Route does not exist" });
});

export default app;
