import { Router } from "express";
import { createCourseContentController } from "../../controllers/coursesContent/coursesContent.controllers";
const courseContentRoutes = Router();

courseContentRoutes.post('/:id', createCourseContentController);

export default courseContentRoutes;


