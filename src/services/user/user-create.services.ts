import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../../interfaces/user";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

const prisma = new PrismaClient();
const createUserServices = async (data: UserRequest): Promise<Omit<UserRequest, 'password'>> => {
  const { email, password, name, cpf, dateBirth, picture } = data;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const cpfAlreadyExists = await prisma.user.findUnique({
    where: {
      cpf,
    },
  });

  if (cpfAlreadyExists) {
    throw new AppError("CPF já cadastrado", 403);
  }

  if (userAlreadyExists) {
    throw new AppError("E-mail já cadastrado", 403);
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: await hash(password, 10),
      cpf: cpf,
      dateBirth: dateBirth,
      picture: picture,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: UserPassword, ...userWithoutPassword } = user;
  return userWithoutPassword

};

export { createUserServices };
