import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse } from '../utils/responseHandler.js';
import { loginUser, registerUser } from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    sendResponse(res, HTTP_STATUS.OK, true, 'Login successful', {
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Login failed';
    sendResponse(res, statusCode, false, message);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    await registerUser(name, email, password, confirmPassword);
    sendResponse(res, HTTP_STATUS.CREATED, true, 'Admin registered successfully');
  } catch (error) {
    console.error('Registration Error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Registration failed';
    sendResponse(res, statusCode, false, message);
  }
};
