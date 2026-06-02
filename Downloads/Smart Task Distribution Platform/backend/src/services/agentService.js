import Agent from '../models/Agent.js';
import Task from '../models/Task.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateName,
} from '../utils/validators.js';

export const createAgent = async (agentData) => {
  const { name, email, mobile, password } = agentData;

  if (!validateName(name)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: 'Name must be between 2-50 characters',
    };
  }

  if (!validateEmail(email)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    };
  }

  if (!validatePhone(mobile)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_PHONE,
    };
  }

  if (!validatePassword(password)) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_SHORT,
    };
  }

  const existingEmail = await Agent.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    throw {
      statusCode: HTTP_STATUS.CONFLICT,
      message: ERROR_MESSAGES.EMAIL_EXISTS,
    };
  }

  const existingMobile = await Agent.findOne({ mobile });
  if (existingMobile) {
    throw {
      statusCode: HTTP_STATUS.CONFLICT,
      message: ERROR_MESSAGES.MOBILE_EXISTS,
    };
  }

  const agent = new Agent({
    name: name.trim(),
    email: email.toLowerCase(),
    mobile,
    password,
  });

  await agent.save();
  return agent.toJSON();
};

export const getAllAgents = async (search = '', page = 1, limit = 10) => {
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const skip = (page - 1) * limit;
  const agents = await Agent.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalRecords = await Agent.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    agents,
    page,
    totalPages,
    totalRecords,
  };
};

export const getAgentById = async (agentId) => {
  const agent = await Agent.findById(agentId);
  if (!agent) {
    throw {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: 'Agent not found',
    };
  }
  return agent;
};

export const deleteAgent = async (agentId) => {
  const agent = await Agent.findById(agentId);
  if (!agent) {
    throw {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: 'Agent not found',
    };
  }

  const assignedTasks = await Task.countDocuments({ assignedAgent: agentId });
  if (assignedTasks > 0) {
    throw {
      statusCode: HTTP_STATUS.CONFLICT,
      message: ERROR_MESSAGES.AGENT_HAS_TASKS,
    };
  }

  await Agent.findByIdAndDelete(agentId);
  return { message: 'Agent deleted successfully' };
};

export const getAgentStats = async () => {
  const totalAgents = await Agent.countDocuments();
  const totalTasks = await Task.countDocuments();
  const averageTasks = totalAgents > 0 ? Math.round(totalTasks / totalAgents) : 0;

  return {
    totalAgents,
    totalTasks,
    averageTasks,
  };
};
