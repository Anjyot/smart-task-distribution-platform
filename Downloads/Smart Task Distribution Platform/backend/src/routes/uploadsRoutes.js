import express from 'express';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
import {
  listUploads,
  getUploadDetails,
  removeUpload,
  migrateLegacyUploads,
} from '../controllers/uploadHistoryController.js';

const router = express.Router();

router.get('/', authenticateToken, authorizeAdmin, listUploads);
router.get('/:id', authenticateToken, authorizeAdmin, getUploadDetails);
router.post('/migrate', authenticateToken, authorizeAdmin, migrateLegacyUploads);
router.delete('/:id', authenticateToken, authorizeAdmin, removeUpload);

export default router;
