import path from 'path';
import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse } from '../utils/responseHandler.js';
import { parseFile, deleteFile } from '../utils/fileParser.js';
import { processUpload } from '../services/uploadService.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, false, 'File is required');
    }

    const filePath = req.file.path;
    const userId = req.user.userId;
    const fileName = req.file.originalname;
    const fileType = path.extname(fileName).replace('.', '').toLowerCase();

    // Parse file
    const records = await parseFile(filePath);

    // Process upload and distribution
    const result = await processUpload(records, userId, fileName, fileType);

    // Delete temporary file
    deleteFile(filePath);

    sendResponse(res, HTTP_STATUS.OK, true, 'File processed successfully', {
      upload: result.upload,
      summary: {
        totalRows: result.totalRows,
        validRows: result.validRows,
        distributedRows: result.distributedRows,
        agents: result.agents,
      },
      distribution: result.summary,
    });
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }

    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'File processing failed';
    sendResponse(res, statusCode, false, message);
  }
};
