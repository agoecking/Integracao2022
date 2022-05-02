import "reflect-metadata";
import "./config/dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "./database";
import "./shared/container";

import { AppError } from "./shared/errors/AppError";
import { router } from "./shared/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log("Server is Running 👍");
});
