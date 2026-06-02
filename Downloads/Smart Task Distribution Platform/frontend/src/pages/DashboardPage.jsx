import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, Loader } from '../components/CommonComponents';
import { taskService } from '../services/apiService';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [statsResponse, assignmentResponse] = await Promise.all([
        taskService.getDashboardStats(),
        taskService.getAgentTaskStats(),
      ]);

      setStats(statsResponse.data.data);
      setAssignmentData(assignmentResponse.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout currentPage="/dashboard">
        <Loader />
      </DashboardLayout>
    );
  }

  const chartData = [
    { name: 'Total Agents', value: stats?.totalAgents || 0 },
    { name: 'Total Tasks', value: stats?.totalTasks || 0 },
    { name: 'Total Uploads', value: stats?.totalUploads || 0 },
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  const topAgent = assignmentData && assignmentData.length > 0 ? assignmentData[0] : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border shadow-sm text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-gray-700">{payload[0].value} Tasks Assigned</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout currentPage="/dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Agent Task Distribution System</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Total Agents</p>
            <p className="text-4xl font-bold text-blue-600">{stats?.totalAgents || 0}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Total Tasks</p>
            <p className="text-4xl font-bold text-green-600">{stats?.totalTasks || 0}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Total Uploads</p>
            <p className="text-4xl font-bold text-amber-600">{stats?.totalUploads || 0}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Avg Tasks/Agent</p>
            <p className="text-4xl font-bold text-purple-600">{stats?.averageTasksPerAgent || 0}</p>
          </div>
        </Card>
      </div>

      {/* Charts - Existing Distribution Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* NEW: Agent Task Assignment Overview Chart */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Agent Task Assignment Overview</h2>
              <p className="text-sm text-gray-600">Shows total assigned tasks per agent, sorted by highest load.</p>
            </div>

            {assignmentData.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl font-semibold text-gray-800">No task assignments available</p>
                <p className="text-gray-600 mt-2">Assign tasks to agents to see performance metrics here.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div style={{ minWidth: Math.max(assignmentData.length * 120, 320) }}>
                  <ResponsiveContainer width="100%" height={360}>
                    <BarChart data={assignmentData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="agentName" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
                      <YAxis allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="taskCount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 font-medium">Top Assigned Agent</p>
              {topAgent ? (
                <p className="text-xl font-bold text-blue-900">
                  {topAgent.agentName}
                  <span className="text-sm font-normal text-gray-700"> ({topAgent.taskCount} Assigned Tasks)</span>
                </p>
              ) : (
                <p className="text-base text-gray-700">No assigned tasks available yet.</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
