import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, Button, Loader } from '../components/CommonComponents';
import { uploadService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const UploadHistoryPage = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [migrateLoading, setMigrateLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const { user } = useAuth();

  const loadUploads = async (currentPage = 1, currentSearch = '') => {
    setLoading(true);
    try {
      const response = await uploadService.getUploads(currentSearch, currentPage, 10);
      setUploads(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      toast.error('Failed to load upload history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUploads(page, search);
  }, []);

  const handleSearch = () => {
    setPage(1);
    loadUploads(1, search);
  };

  const handleView = async (uploadId) => {
    try {
      const response = await uploadService.getUploadById(uploadId);
      setSelectedUpload(response.data.data);
      setShowDetails(true);
    } catch (error) {
      toast.error('Failed to load upload details');
    }
  };

  const handleDelete = (upload) => {
    setDeleteTarget(upload);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await uploadService.deleteUpload(deleteTarget._id);
      toast.success('Upload deleted successfully');
      setDeleteTarget(null);
      loadUploads(page, search);
    } catch (error) {
      toast.error('Failed to delete upload');
    } finally {
      setDeleteLoading(false);
    }
  };

  const onPageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    loadUploads(newPage, search);
  };

  const handleMigrateLegacyUploads = async () => {
    setMigrateLoading(true);
    try {
      const response = await uploadService.migrateLegacyUploads();
      const migratedTasks = response.data.data.migratedTasks || 0;
      toast.success(`${migratedTasks} legacy task(s) migrated successfully`);
      loadUploads(1, search);
    } catch (error) {
      toast.error('Failed to migrate legacy uploads');
    } finally {
      setMigrateLoading(false);
    }
  };

  const handleResetTestData = async () => {
    const confirmed = window.confirm('This will delete all uploads and associated tasks. Are you sure?');
    if (!confirmed) {
      return;
    }
    setResetLoading(true);
    try {
      await uploadService.resetTestData();
      toast.success('Test data reset successfully');
      loadUploads(1, search);
    } catch (error) {
      toast.error('Failed to reset test data');
    } finally {
      setResetLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <DashboardLayout currentPage="/uploads">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Upload History</h1>
        <p className="text-gray-600">Track previous uploads, review distribution details, and delete old uploads.</p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Total uploads</p>
            <p className="text-3xl font-bold text-blue-600">{totalRecords}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="flex gap-2 items-center w-full md:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by file, status or date"
                className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {user?.role === 'admin' && (
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleMigrateLegacyUploads}
                  loading={migrateLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Migrate Legacy Uploads
                </Button>
                <Button
                  onClick={handleResetTestData}
                  loading={resetLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Reset Test Data
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : uploads.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-semibold text-gray-800">No uploads found</p>
            <p className="text-gray-600 mt-2">Upload a file to start tracking upload history.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">File Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">File Type</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Records</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Upload Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-700">{upload.fileName}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 uppercase">{upload.fileType}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{upload.totalRecords}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{formatDate(upload.uploadDate)}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{upload.status}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 flex gap-2">
                      <Button onClick={() => handleView(upload._id)} className="bg-indigo-600 hover:bg-indigo-700">
                        View
                      </Button>
                      <Button onClick={() => handleDelete(upload)} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && uploads.length > 0 && (
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-600">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                Previous
              </Button>
              <Button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {showDetails && selectedUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Details</h2>
                <p className="text-sm text-gray-600">{selectedUpload.upload.fileName}</p>
              </div>
              <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-gray-900 text-2xl">×</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">File Name</p>
                  <p className="font-semibold text-gray-900">{selectedUpload.upload.fileName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Records</p>
                  <p className="font-semibold text-gray-900">{selectedUpload.upload.totalRecords}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Uploaded</p>
                  <p className="font-semibold text-gray-900">{formatDate(selectedUpload.upload.uploadDate)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribution Summary</h3>
                {selectedUpload.distributionSummary && Object.keys(selectedUpload.distributionSummary).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedUpload.distributionSummary).map(([agentName, data]) => (
                      <div key={agentName} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-gray-800">{agentName}</p>
                        <p className="text-sm text-gray-600">{data.count} records</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No distribution summary available.</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Assigned Records</h3>
                {selectedUpload.tasks.length === 0 ? (
                  <p className="text-sm text-gray-600">No tasks found for this upload.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-100">
                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Agent</th>
                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Phone</th>
                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedUpload.tasks.map((task) => (
                          <tr key={task._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-700">{task.assignedAgent?.name || 'Unknown'}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{task.firstName}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{task.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{task.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Delete Upload</h2>
              <p className="text-gray-600 mt-3">
                Are you sure you want to delete this upload and all associated tasks?
              </p>
              <p className="text-sm text-gray-500 mt-2">{deleteTarget.fileName}</p>

              <div className="mt-6 flex items-center gap-3 justify-end">
                <Button onClick={() => setDeleteTarget(null)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  Cancel
                </Button>
                <Button onClick={confirmDelete} loading={deleteLoading} className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
