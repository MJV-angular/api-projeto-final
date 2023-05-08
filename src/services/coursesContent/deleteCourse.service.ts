import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteCourseService = async (courseId: string) => {

  await prisma.course.delete({
    where: {
      id: Number(courseId),
    },
  });

  return {
    message: "Curso deletado"
  }
}

export default deleteCourseService;
