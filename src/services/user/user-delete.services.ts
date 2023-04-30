import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserService = async (Userid: string) => {

  await prisma.user.delete({
    where: {
      id: Number(Userid),
    },
  });

  return {
    message: "Usuário deletado"
  }
};

export { deleteUserService };
