import { PrismaClient } from "@prisma/client";
import { UserRequest, UserResponse } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

const createUserServices = async (data: UserRequest): Promise<UserResponse | undefined> => {

  const { email, password, name, cpf, dateBirth, picture, address } = data;
  const infoAddress = ['city', 'state', 'country', 'number', 'street', 'zipCode']

  infoAddress.forEach(value => {
    if (!Object.keys(address).includes(value)) {
      throw new AppError(`A propriedade ${value} é obrigatória`, 400);
    }
  })

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

  if (userAlreadyExists) {
    throw new AppError("E-mail já cadastrado", 403);
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
      name,
      cpf,
      dateBirth,
      picture,
      address: {
        create: {
          city: address.city,
          country: address.country,
          number: address.number,
          state: address.state,
          street: address.street,
          zipCode: address.zipCode,
        }
      }
    }
  });


  const UserResponse = await prisma.user.findUnique({
    where: {
      id: newUser.id,
    },
    include: {
      address: true,
      comments: true,
      courses: true,
      posts: true
    },

  });

  if (UserResponse)
    return UserResponse
};

export { createUserServices };
