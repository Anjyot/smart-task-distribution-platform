import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, Button, Loader, EmptyState } from '../components/CommonComponents';
import { taskService } from '../services/apiService';
import toast from 'react-hot-toast';

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  useEffect(() => {
    if (search) {
      searchTasks();
    } else {
      fetchTasks();
    }
  }, [pagination.page, search]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks(pagination.page, 10);
      setTasks(response.data.data);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalRecords: response.data.totalRecords,
      });
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const searchTasks = async () => {
    if (!search.trim()) {
      fetchTasks();
      return;
    }

    setLoading(true);
    try {
      const response = await taskService.searchTasks(search, pagination.page, 10);
      setTasks(response.data.data);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalRecords: response.data.totalRecords,
      });
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout currentPage="/tasks">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
        <p className="text-gray-600">Total Tasks: {pagination.totalRecords}</p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <input
          type="text"
          placeholder="Search by name, phone, or notes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination({ ...pagination, page: 1 });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      {/* Tasks Table */}
      <Card>
        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState message="No tasks available. Upload a file to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">First Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Notes</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Assigned Agent</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{task.firstName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{task.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{task.notes}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {task.assignedAgent?.name || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(task.createdAt).toLocaleDateString()}
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
    </DashboardLayout>
  );
};
