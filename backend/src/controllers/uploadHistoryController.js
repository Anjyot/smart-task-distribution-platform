import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse, sendPaginatedResponse } from '../utils/responseHandler.js';
import {
  getUploads,
  getUploadById,
  getRelatedTasksForUpload,
  deleteUploadById,
  migrateLegacyUploads as migrateLegacyUploadsService,
} from '../services/uploadHistoryService.js';

export const listUploads = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const result = await getUploads(search, parseInt(page), parseInt(limit));

    sendPaginatedResponse(
      res,
      HTTP_STATUS.OK,
      true,
      result.uploads,
      result.page,
      result.totalPages,
      result.totalRecords
    );
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const getUploadDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await getUploadById(id);

    if (!upload) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, false, 'Upload not found');
    }

    const tasks = await getRelatedTasksForUpload(id, 1, 50);
    sendResponse(res, HTTP_STATUS.OK, true, 'Upload details retrieved', {
      upload,
      tasks: tasks.tasks,
      pagination: {
        page: tasks.page,
        totalPages: tasks.totalPages,
        totalRecords: tasks.totalRecords,
      },
      distributionSummary: upload.distributionSummary,
    });
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const migrateLegacyUploads = async (req, res) => {
  try {
    const result = await migrateLegacyUploadsService(req.user.userId);

    if (result.migratedTasks === 0) {
      return sendResponse(res, HTTP_STATUS.OK, true, 'No legacy uploads found to migrate', {
        migratedTasks: 0,
      });
    }

    sendResponse(res, HTTP_STATUS.OK, true, 'Legacy uploads migrated successfully', result);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const removeUpload = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUploadById(id);
    sendResponse(res, HTTP_STATUS.OK, true, 'Upload deleted successfully');
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};
