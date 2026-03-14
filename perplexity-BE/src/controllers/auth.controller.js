import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/mail.service.js';


/*
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
* @body { username, email, password }
*/
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: 'Username or email is already taken',
      success: false,
      err: "User already exists."
    });
  }

  // Continue with user registration logic
  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = jwt.sign({
    email: user.email
  }, 
  process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: 'Welcome to Perplexity',
    html: `<h1>Welcome to Perplexity, ${username}!</h1>
           <p>Thank you for registering. We're excited to have you on board!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
           <p>Best regards,<br/>The Perplexity Team</p>
          `,
  })

  res.status(201).json({
    message: "user registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

}

/*
* @route GET /api/auth/verify-email
* @desc Verify user email
* @access Public
* @query { token }
*/
export const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({ email: decoded.email });

  if(!user){
    return res.status(400).json({
      message: "invalid token",
      success: false,
      err: "user not found"
    })
  }

  user.verified = true;
  user.save();

  const html = `
    <h1>Email verified successfully</h1>
    <p>You can now login to your account</p>
    <a href="http://localhost:3000/login">Login</a>
  
  `
  res.send(html)
}


/*
* @route POST /api/auth/login
* @desc Login a user
* @access Public
* @body { email, password }
*/
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if(!user){
    res.status(400).json({
      message: "invalid credentials",
      success: false,
      err: "User not found"
    })
  }

  const isPasswordValid = await user.comparePassword(password);

  if(!isPasswordValid){
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      err: "Invalid password"
    })
  }

  if(!user.verified){
    return res.status(400).json({
      message: "Please verify your email first",
      success: false,
      err: "Email not verified"
    })
  }

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d"});

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  })

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

/*
* @route GET /api/auth/get-me
* @desc Get current user
* @access Private
* @headers { Authorization: Bearer <token> }
*/
export const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password");

  if(!user){
    return res.status(404).json({
      message: "User not found",
      success: false,
      error: "User not found"
    })
  }

  res.status(200).json({
    message: "User data fetched successfully",
    success: true,
    user: user
  })

}