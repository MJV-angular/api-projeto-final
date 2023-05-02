import { PrismaClient } from "@prisma/client";
import { SessionRequest } from "../../interfaces/session";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import "dotenv/config";
import { AppError } from "../../errors/appError";

const createSessionService = async ({ email, password }: SessionRequest) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("senha ou email inválidos", 401);
  }
  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("senha inválida", 401);
  }

  const decoded = {
    email: user.email,
    id: user.id,
    admin: user.admin,
  };


  const token = jwt.sign(decoded, process.env.SECRET_KEY as string, {
    expiresIn: "15h",
    subject: "user.id",
  });

  const UserResponse = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include:{
      address: true,
    }
  });
  return { ...UserResponse, token };
};

export default createSessionService;
