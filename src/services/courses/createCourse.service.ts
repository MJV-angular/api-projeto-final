import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError";
import { ICourseRequest } from "../../interfaces/courses";

const prisma = new PrismaClient();

const createCourseService = async (data: ICourseRequest) => {
  const {name, image} = data
  const infoCourse = ['name', 'image']

  infoCourse.forEach(value => {
    if (!Object.keys(data).includes(value)) {
      throw new AppError(`A propriedade ${value} é obrigatória`, 400);
    }
  })
  

  const newCourse = await prisma.course.create({
    data: {
      name,
      image
    }
  });
  return newCourse
};

export default createCourseService;
