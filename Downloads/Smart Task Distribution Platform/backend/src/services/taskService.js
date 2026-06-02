import Task from '../models/Task.js';

export const getAllTasks = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const tasks = await Task.find()
    .populate('assignedAgent', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalRecords = await Task.countDocuments();
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    tasks,
    page,
    totalPages,
    totalRecords,
  };
};

export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId).populate('assignedAgent', 'name email');
  return task;
};

export const getTasksByAgent = async (agentId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const tasks = await Task.find({ assignedAgent: agentId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalRecords = await Task.countDocuments({ assignedAgent: agentId });
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    tasks,
    page,
    totalPages,
    totalRecords,
  };
};

export const searchTasks = async (searchQuery, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const query = {
    $or: [
      { firstName: { $regex: searchQuery, $options: 'i' } },
      { phone: { $regex: searchQuery, $options: 'i' } },
      { notes: { $regex: searchQuery, $options: 'i' } },
    ],
  };

  const tasks = await Task.find(query)
    .populate('assignedAgent', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalRecords = await Task.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    tasks,
    page,
    totalPages,
    totalRecords,
  };
};

export const getDashboardStats = async () => {
  const totalAgents = await (await import('../models/Agent.js')).default.countDocuments();
  const totalTasks = await Task.countDocuments();
  const totalUploads = await (await import('../models/Upload.js')).default.countDocuments();

  const averageTasksPerAgent = totalAgents > 0 ? Math.round(totalTasks / totalAgents) : 0;

  return {
    totalAgents,
    totalTasks,
    totalUploads,
    averageTasksPerAgent,
  };
};

export const getAgentTaskStats = async () => {
  const stats = await Task.aggregate([
    {
      $group: {
        _id: '$assignedAgent',
        taskCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'agents',
        localField: '_id',
        foreignField: '_id',
        as: 'agent',
      },
    },
    {
      $unwind: {
        path: '$agent',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        agentName: {
          $cond: [
            { $gt: [{ $strLenCP: '$agent.name' }, 0] },
            '$agent.name',
            'Unknown Agent'
          ],
        },
        taskCount: 1,
      },
    },
    { $sort: { taskCount: -1 } },
  ]);

  return stats.map((entry) => ({
    agentName: entry.agentName,
    taskCount: entry.taskCount,
  }));
};
