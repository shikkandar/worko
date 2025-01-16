import { Router } from "express";

const authRouter = Router();

import * as controller from "../controllers/auth.controller";
import { auth } from "../middleware/auth.middleware";
import { getUserData } from "../controllers/user.controller";

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.get("/me", auth, getUserData);

export default authRouter;
