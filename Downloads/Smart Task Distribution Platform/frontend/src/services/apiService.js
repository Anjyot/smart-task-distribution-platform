import apiClient from '../api/axiosConfig';

export const authService = {
  register: (name, email, password, confirmPassword) =>
    apiClient.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const agentService = {
  createAgent: (agentData) =>
    apiClient.post('/agents', agentData),
  getAgents: (search = '', page = 1, limit = 10) =>
    apiClient.get('/agents', {
      params: { search, page, limit },
    }),
  getAgent: (id) =>
    apiClient.get(`/agents/${id}`),
  deleteAgent: (id) =>
    apiClient.delete(`/agents/${id}`),
  getStats: () =>
    apiClient.get('/agents/stats'),
};

export const taskService = {
  getTasks: (page = 1, limit = 10) =>
    apiClient.get('/tasks', {
      params: { page, limit },
    }),
  getTask: (id) =>
    apiClient.get(`/tasks/${id}`),
  getAgentTasks: (agentId, page = 1, limit = 10) =>
    apiClient.get(`/tasks/agent/${agentId}`, {
      params: { page, limit },
    }),
  searchTasks: (search, page = 1, limit = 10) =>
    apiClient.get('/tasks/search', {
      params: { search, page, limit },
    }),
  getDashboardStats: () =>
    apiClient.get('/tasks/dashboard/stats'),
  getAgentTaskStats: () =>
    apiClient.get('/tasks/dashboard/agent-task-stats'),
};

export const uploadService = {
  uploadFile: (formData) =>
    apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getUploads: (search = '', page = 1, limit = 10) =>
    apiClient.get('/uploads', {
      params: { search, page, limit },
    }),
  getUploadById: (id) => apiClient.get(`/uploads/${id}`),
  deleteUpload: (id) => apiClient.delete(`/uploads/${id}`),
  migrateLegacyUploads: () => apiClient.post('/uploads/migrate'),
  resetTestData: () => apiClient.post('/admin/reset-test-data'),
};
