export const ALLOWED_FILE_TYPES = ['.csv', '.xls', '.xlsx'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MIN_AGENTS_REQUIRED = 5;
export const JWT_EXPIRY = '1d';
export const BCRYPT_SALT_ROUNDS = 10;

export const REQUIRED_COLUMNS = ['FirstName', 'Phone', 'Notes'];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'Email already exists',
  MOBILE_EXISTS: 'Mobile number already exists',
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_SHORT: 'Password must be at least 8 characters',
  UNAUTHORIZED: 'Unauthorized access',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token',
  FILE_REQUIRED: 'File is required',
  INVALID_FILE_FORMAT: 'Invalid file format',
  FILE_SIZE_EXCEEDED: 'File size exceeds limit',
  NO_RECORDS: 'File contains no records',
  INVALID_COLUMNS: 'Invalid file format. Required columns: FirstName, Phone, Notes',
  INSUFFICIENT_AGENTS: 'At least 5 agents are required before uploading records',
  AGENT_HAS_TASKS: 'Agent has assigned tasks and cannot be deleted',
  INVALID_PHONE: 'Phone must contain country code (e.g., +919876543210)',
};
