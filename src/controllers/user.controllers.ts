import { Request, Response } from "express";
import { createUserServices } from "../services/user/user-create.services";
import { UserRequest } from "../interfaces/user";
import { updateUserService } from "../services/user/user-update.services";
import { deleteUserService } from "../services/user/user-delete.services";
const createUserController = async (req: Request, res: Response) => {
  try {
    const { ...data }: UserRequest = req.body;
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

const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await updateUserService(id, data);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await deleteUserService(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export { createUserController, updateUserController, deleteUserController };
