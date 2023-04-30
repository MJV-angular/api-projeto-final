import { PrismaClient } from "@prisma/client";
import { UserRequest, UserResponse } from "../../interfaces/user";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

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


  await prisma.address.create({
    data: {
      city: address.city,
      country: address.country,
      number: address.number,
      state: address.state,
      street: address.street,
      zipCode: address.zipCode,
      userId: user.id,
    }
  })


  const UserResponse = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      password: false,
      createdAt: true,
      cpf: true,
      dateBirth: true,
      picture: true,
      posts: true,
      admin: true,
      comments: true,
    },
  });
  
  if (UserResponse)
    return UserResponse
};

export { createUserServices };
