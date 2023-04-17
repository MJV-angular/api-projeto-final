import { Request, Response } from "express";
import { SessionRequest } from "../interfaces/session";
import createSessionService from "../services/session/session.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const dataSession: SessionRequest = req.body;
    const session = await createSessionService(dataSession);
    return res.json(session);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export default createSessionController;
