import { Request, Response } from 'express';
import { createUserServices } from '../services/user-create.services';
import { UserRequest } from '../interfaces/user';
const createUserController = async (req: Request, res: Response) => {
    try {
      const { ...data } : UserRequest = req.body;
      const newUser = await createUserServices(data);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  };

export {
    createUserController
}