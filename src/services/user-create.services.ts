import { PrismaClient } from '@prisma/client';
import { UserRequest } from '../interfaces/user';
import { hash } from 'bcryptjs';
import { AppError } from '../errors/appError';

const prisma = new PrismaClient();
const createUserServices = async (data: UserRequest) => {
  const {email, password, name} = data;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    throw new AppError('E-mail já cadastrado', 403);
  }
  
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: await hash(password,10),
    }
  })

  return user
};

export {
  createUserServices,
};
