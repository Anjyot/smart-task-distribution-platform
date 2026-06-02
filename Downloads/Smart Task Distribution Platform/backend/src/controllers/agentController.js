import { HTTP_STATUS } from '../config/constants.js';
import { sendResponse, sendPaginatedResponse } from '../utils/responseHandler.js';
import {
  createAgent,
  getAllAgents,
  getAgentById,
  deleteAgent,
  getAgentStats,
} from '../services/agentService.js';

export const addAgent = async (req, res) => {
  try {
    const agent = await createAgent(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, true, 'Agent created successfully', agent);
  } catch (error) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Failed to create agent';
    sendResponse(res, statusCode, false, message);
  }
};

export const listAgents = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const result = await getAllAgents(search, parseInt(page), parseInt(limit));

    sendPaginatedResponse(
      res,
      HTTP_STATUS.OK,
      true,
      result.agents,
      result.page,
      result.totalPages,
      result.totalRecords
    );
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};

export const getAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await getAgentById(id);
    sendResponse(res, HTTP_STATUS.OK, true, 'Agent retrieved successfully', agent);
  } catch (error) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Failed to fetch agent';
    sendResponse(res, statusCode, false, message);
  }
};

export const removeAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAgent(id);
    sendResponse(res, HTTP_STATUS.OK, true, 'Agent deleted successfully');
  } catch (error) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Failed to delete agent';
    sendResponse(res, statusCode, false, message);
  }
};

export const agentStats = async (req, res) => {
  try {
    const stats = await getAgentStats();
    sendResponse(res, HTTP_STATUS.OK, true, 'Stats retrieved', stats);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, error.message);
  }
};
