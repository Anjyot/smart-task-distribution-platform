import express from 'express';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
import { resetTestDataController } from '../controllers/adminController.js';

const router = express.Router();

router.post('/reset-test-data', authenticateToken, authorizeAdmin, resetTestDataController);

export default router;
