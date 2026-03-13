import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

// Register route

/*
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
* @body { username, email, password }
*/
authRouter.post('/register', registerValidator, registerController);




export default authRouter;