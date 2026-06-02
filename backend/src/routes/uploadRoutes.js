import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload, uploadErrorHandler } from '../middleware/uploadMiddleware.js';
import { uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', authenticateToken, upload.single('file'), uploadErrorHandler, uploadFile);

export default router;
