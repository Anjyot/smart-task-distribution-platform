import Upload from '../models/Upload.js';
import Task from '../models/Task.js';

export const getUploads = async (search = '', page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const query = {};
  if (search && search.trim().length > 0) {
    const searchRegex = new RegExp(search.trim(), 'i');
    const searchDate = Date.parse(search);
    query.$or = [
      { fileName: { $regex: searchRegex } },
      { status: { $regex: searchRegex } },
    ];
    if (!Number.isNaN(searchDate)) {
      const date = new Date(searchDate);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));
      query.$or.push({ uploadDate: { $gte: start, $lte: end } });
    }
  }

  const uploads = await Upload.find(query)
    .populate('uploadedBy', 'name email')
    .sort({ uploadDate: -1 })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Upload.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    uploads,
    page,
    totalPages,
    totalRecords,
  };
};

export const getUploadById = async (uploadId) => {
  const upload = await Upload.findById(uploadId).populate('uploadedBy', 'name email');
  return upload;
};

export const getRelatedTasksForUpload = async (uploadId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const tasks = await Task.find({ uploadId })
    .populate('assignedAgent', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Task.countDocuments({ uploadId });
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    tasks,
    page,
    totalPages,
    totalRecords,
  };
};

export const deleteUploadById = async (uploadId) => {
  await Upload.findByIdAndDelete(uploadId);
  await Task.deleteMany({ uploadId });
};

export const migrateLegacyUploads = async (uploadedById) => {
  const legacyQuery = {
    $or: [{ uploadId: { $exists: false } }, { uploadId: null }],
  };

  const legacyTasks = await Task.find(legacyQuery);
  if (legacyTasks.length === 0) {
    return { migratedTasks: 0 };
  }

  const distributionData = await Task.aggregate([
    { $match: legacyQuery },
    { $group: { _id: '$assignedAgent', count: { $sum: 1 } } },
    {
      $lookup: {
        from: 'agents',
        localField: '_id',
        foreignField: '_id',
        as: 'agent',
      },
    },
    { $unwind: { path: '$agent', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        agentName: { $ifNull: ['$agent.name', 'Unknown'] },
        count: 1,
      },
    },
  ]);

  const distributionSummary = {};
  distributionData.forEach((entry) => {
    distributionSummary[entry.agentName] = { count: entry.count };
  });

  const upload = new Upload({
    fileName: 'Legacy Upload Migration',
    fileType: 'legacy',
    totalRecords: legacyTasks.length,
    uploadedBy: uploadedById,
    status: 'Completed',
    distributionSummary,
  });

  await upload.save();
  await Task.updateMany(legacyQuery, { uploadId: upload._id });

  return {
    migratedTasks: legacyTasks.length,
    upload,
  };
};
