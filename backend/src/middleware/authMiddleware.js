import jwt from 'jsonwebtoken';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: ERROR_MESSAGES.TOKEN_EXPIRED,
          });
        }
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_TOKEN,
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};
