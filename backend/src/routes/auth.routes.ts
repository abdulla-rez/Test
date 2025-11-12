import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { userRegisterSchema } from "../validations/auth.validation";

const routes = Router()

routes.post("/register", validateBody(userRegisterSchema), registerUser);
routes.post("/login", loginUser);


export default routes;