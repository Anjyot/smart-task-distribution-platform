import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS, ERROR_MESSAGES, JWT_EXPIRY } from '../config/constants.js';
import { validateEmail, validatePassword, validateName } from '../utils/validators.js';

export const registerUser = async (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: 'Name, email, password, and confirm password are required',
    };
  }

  if (password !== confirmPassword) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: 'Passwords do not match',
    };
  }

  if (!validateName(name)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: 'Please enter a valid name',
    };
  }

  if (!validateEmail(email)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    };
  }

  if (!validatePassword(password) || password.length < 8) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_SHORT,
    };
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw {
      statusCode: HTTP_STATUS.CONFLICT,
      message: ERROR_MESSAGES.EMAIL_EXISTS,
    };
  }

  try {
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: 'admin',
    });

    await user.save();
    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw {
        statusCode: HTTP_STATUS.CONFLICT,
        message: ERROR_MESSAGES.EMAIL_EXISTS,
      };
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: 'Email and password are required',
    };
  }

  if (!validateEmail(email)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    };
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    throw {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: ERROR_MESSAGES.USER_NOT_FOUND,
    };
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    };
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
