import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ errors: error.array() });
  }

  next();
};

export const registerValidator = [
  body("username").trim().notEmpty().withMessage("username is required")
    .isLength({ min: 3, max: 20 }).withMessage("username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("username can only contain letters, numbers, and underscores"),

  body("email").trim().notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("password is required")
    .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),

  // validateion result handler
  validate
];

