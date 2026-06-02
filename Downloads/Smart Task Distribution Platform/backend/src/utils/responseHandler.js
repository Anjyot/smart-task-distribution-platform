export const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const sendPaginatedResponse = (res, statusCode, success, data, page, totalPages, totalRecords) => {
  return res.status(statusCode).json({
    success,
    page,
    totalPages,
    totalRecords,
    data,
  });
};

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
