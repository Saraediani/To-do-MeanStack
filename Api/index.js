import app from "./server.js";
import connectDb from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV) {
  app.use(express.static("client/build"))
}

const start = async () => {
  try {
    await connectDb(process.env.DATABASE_LOCAL);
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();