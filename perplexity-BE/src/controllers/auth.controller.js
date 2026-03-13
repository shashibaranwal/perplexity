import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/mail.service.js';

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