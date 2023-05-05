import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../../interfaces/user";


const prisma = new PrismaClient();

const updateUserService = async (Userid: string, data: UserRequest) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, address, ...userData } = data;
  await prisma.user.update({
    where: {
      id: Number(Userid),
    },
    data: {
      ...userData,
      address: {
        update: {
          ...address
        },
      },
    },
  });


  const user = await prisma.user.findUnique({
    where: { id: Number(Userid) },
    include: {
      address: true,
      posts: true,
      comments: true,
      courses: true,
    },
  });
  return user
};

export { updateUserService };
