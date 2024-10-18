import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, AlertTriangle, CheckCircle, Settings, BarChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [trafficStatus, setTrafficStatus] = useState<'normal' | 'congested' | 'incident'>('normal');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTrafficStatusChange = (status: 'normal' | 'congested' | 'incident') => {
    setTrafficStatus(status);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BarChart className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Traffic Management System</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Traffic Control Dashboard</h1>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Traffic Status
                      </dt>
                      <dd className="flex items-center">
                        {trafficStatus === 'normal' && <CheckCircle className="h-5 w-5 text-green-500 mr-2" />}
                        {trafficStatus === 'congested' && <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />}
                        {trafficStatus === 'incident' && <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-lg font-semibold text-gray-900 capitalize">
                          {trafficStatus}
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <button
                    onClick={() => handleTrafficStatusChange('normal')}
                    className="font-medium text-indigo-600 hover:text-indigo-500 mr-4"
                  >
                    Set Normal
                  </button>
                  <button
                    onClick={() => handleTrafficStatusChange('congested')}
                    className="font-medium text-indigo-600 hover:text-indigo-500 mr-4"
                  >
                    Set Congested
                  </button>
                  <button
                    onClick={() => handleTrafficStatusChange('incident')}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Report Incident
                  </button>
                </div>
              </div>
            </div>

            {/* Add more dashboard widgets here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;