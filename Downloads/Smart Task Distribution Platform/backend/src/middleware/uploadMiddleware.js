import multer from 'multer';
import path from 'path';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'upload-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_FILE_TYPES.includes(ext)) {
    return cb(new Error(ERROR_MESSAGES.INVALID_FILE_FORMAT), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.FILE_SIZE_EXCEEDED,
      });
    }
  } else if (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: err.message || ERROR_MESSAGES.INVALID_FILE_FORMAT,
    });
  }
  next();
};
