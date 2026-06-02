import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  addAgent,
  listAgents,
  getAgent,
  removeAgent,
  agentStats,
} from '../controllers/agentController.js';

const router = express.Router();

router.post('/', authenticateToken, addAgent);
router.get('/', authenticateToken, listAgents);
router.get('/stats', authenticateToken, agentStats);
router.get('/:id', authenticateToken, getAgent);
router.delete('/:id', authenticateToken, removeAgent);

export default router;
