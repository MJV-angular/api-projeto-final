import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError";
import { ICoursesContent } from "../../interfaces/coursesContent";

const prisma = new PrismaClient();

const createCourseContentService = async (id: string, data: ICoursesContent) => {

  const {title, video_url, text } = data
  const infoCourse = ['title', 'video_url', 'text']

  infoCourse.forEach(value => {
    if (!Object.keys(data).includes(value)) {
      throw new AppError(`A propriedade ${value} é obrigatória`, 400);
    }
  })

  const course =  await prisma.course.findUnique({
    where:{
      id: Number(id)
    }
  })

  if(!course){
    throw new AppError(`Curso não encontrado`, 404)
  }
  
  const newCourse = await prisma.courseContent.create({
    data: {
      title,
      video_url,
      courseId: Number(id),
      text,
    }
  });

  return newCourse
};

export default createCourseContentService;
