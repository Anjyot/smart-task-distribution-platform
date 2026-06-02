import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, Button, Loader } from '../components/CommonComponents';
import { uploadService } from '../services/apiService';
import toast from 'react-hot-toast';

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const isValidFile = (file) => {
    const validExtensions = ['.csv', '.xls', '.xlsx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    const maxSize = 5 * 1024 * 1024;

    if (!validExtensions.includes(ext)) {
      toast.error('Invalid file format. Only CSV, XLS, XLSX are allowed.');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 5MB limit.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (isValidFile(e.target.files[0])) {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadService.uploadFile(formData);
      setResult(response.data.data);
      toast.success('File uploaded and distributed successfully!');
      setFile(null);
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout currentPage="/upload">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Upload & Distribute</h1>
        <p className="text-gray-600">Upload CSV/XLS/XLSX files for automatic task distribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <Card>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              {file ? (
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-2">✓ File Selected</p>
                  <p className="text-gray-600">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-2">📁 Drag and drop your file here</p>
                  <p className="text-gray-600 mb-4">or</p>
                  <label className="inline-block">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      Browse Files
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.xls,.xlsx"
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2 justify-center">
              {file && (
                <Button onClick={() => setFile(null)} className="bg-gray-400">
                  Clear
                </Button>
              )}
              <Button onClick={handleUpload} loading={loading} disabled={!file}>
                {loading ? 'Processing...' : 'Upload & Distribute'}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">📋 File Requirements:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Supported formats: CSV, XLS, XLSX</li>
                <li>✓ Maximum file size: 5MB</li>
                <li>✓ Required columns: FirstName, Phone, Notes</li>
                <li>✓ Minimum 5 agents must exist</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Sample Files */}
        <div>
          <Card className="mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Sample Files</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Download sample files to test:</p>
              <a
                href="/sample-25.csv"
                download
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                📥 sample-25.csv
              </a>
              <a
                href="/sample-27.csv"
                download
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                📥 sample-27.csv
              </a>
              <a
                href="/sample-100.csv"
                download
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                📥 sample-100.csv
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Results */}
      {result && (
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Distribution Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Rows</p>
              <p className="text-2xl font-bold text-blue-600">{result.summary.totalRows}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Valid Rows</p>
              <p className="text-2xl font-bold text-green-600">{result.summary.validRows}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Distributed</p>
              <p className="text-2xl font-bold text-amber-600">{result.summary.distributedRows}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Agents Used</p>
              <p className="text-2xl font-bold text-purple-600">{result.summary.agents}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Agent Distribution:</h3>
            <div className="space-y-2">
              {Object.entries(result.distribution).map(([agentId, data]) => (
                <div key={agentId} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-800">{data.name}</span>
                  <span className="text-sm text-gray-600">
                    {data.count} records ({data.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};
