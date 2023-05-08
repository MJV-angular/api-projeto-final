import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError";
import { ICoursesUser } from "../../interfaces/coursesUser";

const prisma = new PrismaClient();

const createCourseUserService = async (userId: number, data: ICoursesUser) => {
  const { courseId }: ICoursesUser = data
  const idsRegister: number[] = [];
  
  const registerCourses = await prisma.$transaction(
    courseId.map((ele) => prisma.userCourses.findUnique({
      where: {
        id: ele
      }
    })
   )
  );
  
  courseId.forEach(ele => {
    if(registerCourses.map(ele => ele?.courseId).includes(ele)){
      idsRegister.push(ele)
    }
  })
  
  if(idsRegister.length > 0){
    throw new AppError(`Ids já cadastrados: ${idsRegister.join()}`, 400);
  }

  return await prisma.$transaction(
    courseId.map((ele) => prisma.userCourses.create({
      data: {
        courseId: ele, userId: userId
      }
    })),
  );
};

export default createCourseUserService;
