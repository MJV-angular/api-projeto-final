import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

class ErrorMiddleware {
  static async handle(
    error: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

export default ErrorMiddleware;
