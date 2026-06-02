import Task from '../models/Task.js';
import Upload from '../models/Upload.js';

export const resetTestData = async () => {
  await Task.deleteMany({});
  await Upload.deleteMany({});
};
