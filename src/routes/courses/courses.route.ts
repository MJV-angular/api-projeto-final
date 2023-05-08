import { Router } from "express";
import { createCourseController, listCourseController, updatedCourseController, deleteCourseController } from "../../controllers/courses/courses.controllers"
const coursesRoutes = Router();

coursesRoutes.post("", createCourseController);
coursesRoutes.get("", listCourseController);
coursesRoutes.patch('/:id', updatedCourseController)
coursesRoutes.delete('/:id', deleteCourseController)
export default coursesRoutes;

