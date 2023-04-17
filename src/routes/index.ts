import { Router } from "express";

import userRouter from "./user/user.route";
import sessionRoutes from "./session/sessions.route";
const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionRoutes);
export default routes;
