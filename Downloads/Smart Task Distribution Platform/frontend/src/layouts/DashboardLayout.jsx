import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/CommonComponents';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Task Distribution System</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Sidebar = ({ currentPage }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Agents', path: '/agents', icon: '👥' },
    { name: 'Upload', path: '/upload', icon: '📤' },
    { name: 'Uploads', path: '/uploads', icon: '🗂️' },
    { name: 'Tasks', path: '/tasks', icon: '✅' },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-8">Menu</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === item.path
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export const DashboardLayout = ({ children, currentPage }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
