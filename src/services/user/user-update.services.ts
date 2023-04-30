import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../../interfaces/user";


const prisma = new PrismaClient();

const updateUserService = async (Userid: string, data: UserRequest) => {

  const { address, ...userData} = data;
  
  await prisma.user.update({
    where: {
      id: Number(Userid),
    },
    data: {
      ...userData,
      address: {
        update: {
          ...address,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: Number(Userid) },
    include: {
      address: true,
    },
  });
return user
};

export { updateUserService };
