import { Request, Response } from "express";
import createCourseUserService from "../../services/courseUser/createCourseUser.service";
import { ICoursesUser } from "../../interfaces/coursesUser";
const createCourseUserController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user.id)
    const data: ICoursesUser = req.body;
    const resp = await createCourseUserService(userId, data)
    return res.json(resp);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

// const listCourseController = async (req: Request, res: Response) => {
//   try {
//     const resp = await listCourseService()
//     return res.json(resp);
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(400).json({
//         message: error.message,
//       });
//     }
//   }
// };


// const updatedCourseController = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const resp = await updateCourseService(id, data)
//     return res.json(resp);
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(400).json({
//         message: error.message,
//       });
//     }
//   }
// };


// const deleteCourseController = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const resp = await deleteCourseService(id)
//     return res.json(resp);
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(400).json({
//         message: error.message,
//       });
//     }
//   }
// };

export {
  createCourseUserController,
}