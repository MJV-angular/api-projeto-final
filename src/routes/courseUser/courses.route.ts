import { Router } from "express";
import {listCourseController, updatedCourseController, deleteCourseController } from "../../controllers/courses/courses.controllers"
import { createCourseUserController } from "../../controllers/coursesUser/coursesUser.controllers";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
const courseUserRoutes = Router();

courseUserRoutes.post("", ensureAuthMiddleware, createCourseUserController);
courseUserRoutes.get("", listCourseController);
courseUserRoutes.patch('/:id', updatedCourseController)
courseUserRoutes.delete('/:id', deleteCourseController)
export default courseUserRoutes;

