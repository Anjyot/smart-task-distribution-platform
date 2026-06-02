import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  listTasks,
  getTask,
  listAgentTasks,
  search,
  dashboardStats,
  dashboardAgentTaskStats,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/dashboard/stats', authenticateToken, dashboardStats);
router.get('/dashboard/agent-task-stats', authenticateToken, dashboardAgentTaskStats);
router.get('/search', authenticateToken, search);
router.get('/:id', authenticateToken, getTask);
router.get('/', authenticateToken, listTasks);
router.get('/agent/:agentId', authenticateToken, listAgentTasks);

export default router;
