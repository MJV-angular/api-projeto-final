import { PrismaClient } from "@prisma/client";
import { SessionRequest } from "../../interfaces/session";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";
const prisma = new PrismaClient();

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
    select:{
      password: false,
      address: true,
      courses: true,
      comments: true,
      posts: true,
      admin: true,
      cpf: true,
      createdAt: true,
      dateBirth: true,
      email: true,
      id: true,
      name:true,
      picture: true
    }
  });
  return { ...UserResponse, token };
};

export default createSessionService;
