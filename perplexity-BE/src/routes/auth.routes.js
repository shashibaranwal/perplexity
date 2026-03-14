import { Router } from "express";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { registerController, verifyEmailController, resendVerifyEmailController, loginController, getMeController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// Register route

/*
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
* @body { username, email, password }
*/
authRouter.post('/register', registerValidator, registerController);

/*
* @route GET /api/auth/verify-email
* @desc Verify user email
* @access Public
* @query { token }
*/
authRouter.get('/verify-email', verifyEmailController)

/*
* @route GET /api/auth/resend-verification-email
* @desc Resend verification email
* @access Public
* @body { email }
*/
authRouter.post('/resend-verify-email', resendVerifyEmailController)


/*
* @route POST /api/auth/login
* @desc Login a user
* @access Public
* @body { email, password }
*/
authRouter.post('/login', loginValidator, loginController);

/*
* @route GET /api/auth/get-me
* @desc Get current user
* @access Private
* @headers { Authorization: Bearer <token> }
*/
authRouter.get('/get-me', authUser, getMeController);




export default authRouter;