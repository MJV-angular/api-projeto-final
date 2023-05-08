import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listCourseService = async () => {

  const listCourse = await prisma.course.findMany();
  return listCourse
};

export default listCourseService;
