import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse, sendPaginatedResponse } from '../utils/responseHandler.js';
import {
  getAllTasks,
  getTaskById,
  getTasksByAgent,
  searchTasks,
  getDashboardStats,
  getAgentTaskStats,
} from '../services/taskService.js';

export const listTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getAllTasks(parseInt(page), parseInt(limit));

    sendPaginatedResponse(
      res,
      HTTP_STATUS.OK,
      true,
      result.tasks,
      result.page,
      result.totalPages,
      result.totalRecords
    );
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, false, 'Task not found');
    }

    sendResponse(res, HTTP_STATUS.OK, true, 'Task retrieved', task);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const listAgentTasks = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getTasksByAgent(agentId, parseInt(page), parseInt(limit));

    sendPaginatedResponse(
      res,
      HTTP_STATUS.OK,
      true,
      result.tasks,
      result.page,
      result.totalPages,
      result.totalRecords
    );
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const search = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    if (!search || search.trim().length === 0) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, false, 'Search query is required');
    }

    const result = await searchTasks(search, parseInt(page), parseInt(limit));

    sendPaginatedResponse(
      res,
      HTTP_STATUS.OK,
      true,
      result.tasks,
      result.page,
      result.totalPages,
      result.totalRecords
    );
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    sendResponse(res, HTTP_STATUS.OK, true, 'Dashboard stats retrieved', stats);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const dashboardAgentTaskStats = async (req, res) => {
  try {
    const stats = await getAgentTaskStats();
    sendResponse(res, HTTP_STATUS.OK, true, 'Agent task stats retrieved', stats);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};
