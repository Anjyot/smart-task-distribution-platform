import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, Button, Modal, InputField, Loader, EmptyState } from '../components/CommonComponents';
import { agentService } from '../services/apiService';
import toast from 'react-hot-toast';

export const AgentManagementPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAgents();
  }, [pagination.page, search]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const response = await agentService.getAgents(
        search,
        pagination.page,
        10
      );
      setAgents(response.data.data);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalRecords: response.data.totalRecords,
      });
    } catch (error) {
      toast.error('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.mobile || !/^\+\d{1,3}\d{6,14}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must include country code (e.g., +919876543210)';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await agentService.createAgent(formData);
      toast.success('Agent created successfully');
      setShowModal(false);
      setFormData({ name: '', email: '', mobile: '', password: '' });
      fetchAgents();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create agent';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      try {
        await agentService.deleteAgent(id);
        toast.success('Agent deleted successfully');
        fetchAgents();
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete agent';
        toast.error(message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <DashboardLayout currentPage="/agents">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Agent Management</h1>
          <p className="text-gray-600">Total Agents: {pagination.totalRecords}</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add Agent</Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <input
          type="text"
          placeholder="Search agents by name, email, or mobile..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination({ ...pagination, page: 1 });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      {/* Agents Table */}
      <Card>
        {loading ? (
          <Loader />
        ) : agents.length === 0 ? (
          <EmptyState message="No agents found. Create one to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Mobile</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{agent.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{agent.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{agent.mobile}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDelete(agent._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Add Agent Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Agent">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <InputField
            label="Mobile"
            name="mobile"
            placeholder="+919876543210"
            value={formData.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <div className="flex gap-2 justify-end">
            <Button onClick={() => setShowModal(false)} className="bg-gray-400">
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Create Agent
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
