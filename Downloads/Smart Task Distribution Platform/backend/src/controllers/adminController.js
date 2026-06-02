import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse } from '../utils/responseHandler.js';
import { resetTestData } from '../services/adminService.js';

export const resetTestDataController = async (req, res) => {
  try {
    await resetTestData();
    sendResponse(res, HTTP_STATUS.OK, true, 'Test data cleared successfully');
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};
