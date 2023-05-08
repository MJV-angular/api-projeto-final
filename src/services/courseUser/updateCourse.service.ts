import { PrismaClient } from "@prisma/client";
import { ICourseRequest } from "../../interfaces/courses";

const prisma = new PrismaClient();

const updateCourseService = async (courseId: string, data: ICourseRequest) => {
  const {name} = data;

 const courseUpdate = await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      name
    },
  });

  return courseUpdate
};

export default updateCourseService;
