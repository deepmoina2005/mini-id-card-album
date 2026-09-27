import React from 'react';
import { Plus, FolderOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your document album projects efficiently.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Link to="/album-layout" className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">Create New Album</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start a new 4-card or 8-card A4 document album.</p>
          </div>
        </Link>

        <div className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors">Open Project</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Load a previously saved album project.</p>
          </div>
        </div>

        <div className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-green-600 transition-colors">Templates</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage ID, PVC, and Passport photo templates.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="p-12 text-center text-gray-500">
            No recent projects found. Create a new album to get started.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
