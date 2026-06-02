import Agent from '../models/Agent.js';
import Task from '../models/Task.js';
import Upload from '../models/Upload.js';
import { REQUIRED_COLUMNS, MIN_AGENTS_REQUIRED, HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';
import { validatePhone, validateName, validateNotes } from '../utils/validators.js';
import { distributeRecords, calculateDistributionSummary } from '../utils/distributionEngine.js';

export const processUpload = async (records, userId, fileName, fileType) => {
  // Validate file not empty
  if (!records || records.length === 0) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.NO_RECORDS,
    };
  }

  // Check required columns
  if (records.length > 0) {
    const fileColumns = Object.keys(records[0]);
    const hasAllColumns = REQUIRED_COLUMNS.every((col) => fileColumns.includes(col));

    if (!hasAllColumns) {
      throw {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: ERROR_MESSAGES.INVALID_COLUMNS,
      };
    }
  }

  // Fetch all agents
  const agents = await Agent.find();

  if (agents.length < MIN_AGENTS_REQUIRED) {
    throw {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.INSUFFICIENT_AGENTS,
    };
  }

  // Validate records
  const validatedRecords = [];
  const invalidRecords = [];

  records.forEach((record, index) => {
    const errors = [];

    if (!validateName(record.FirstName)) {
      errors.push('Invalid first name');
    }
    if (!validatePhone(record.Phone)) {
      errors.push('Invalid phone number');
    }
    if (!validateNotes(record.Notes)) {
      errors.push('Invalid notes');
    }

    if (errors.length > 0) {
      invalidRecords.push({
        row: index + 2,
        errors,
      });
    } else {
      validatedRecords.push({
        firstName: record.FirstName.trim(),
        phone: record.Phone.trim(),
        notes: record.Notes.trim(),
      });
    }
  });

  // Distribute records
  const distributedTasks = distributeRecords(validatedRecords, agents);

  // Create upload metadata record first
  const uploadRecord = await Upload.create({
    fileName,
    fileType,
    totalRecords: records.length,
    uploadedBy: userId,
    uploadDate: new Date(),
    status: 'Processing',
    distributionSummary: {},
  });

  // Save tasks with upload linkage
  const tasksToSave = distributedTasks.map((task) => ({
    ...task,
    uploadedBy: userId,
    uploadId: uploadRecord._id,
  }));

  const savedTasks = await Task.insertMany(tasksToSave);

  const summary = calculateDistributionSummary(distributedTasks, agents);

  uploadRecord.status = 'Completed';
  uploadRecord.distributionSummary = summary;
  await uploadRecord.save();

  return {
    totalRows: records.length,
    validRows: validatedRecords.length,
    invalidRows: invalidRecords.length,
    distributedRows: savedTasks.length,
    agents: agents.length,
    summary,
    upload: uploadRecord,
    invalidRecords: invalidRecords.length > 0 ? invalidRecords : undefined,
  };
};
