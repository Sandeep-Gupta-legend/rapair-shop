import { useState, useEffect } from 'react';
import { FaTools, FaBox, FaStar, FaEnvelope } from 'react-icons/fa';
import { adminAPI } from '../../services/apiService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    reviews: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Services',
      value: stats.services,
      icon: <FaTools />,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Products',
      value: stats.products,
      icon: <FaBox />,
      color: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    {
      title: 'Total Reviews',
      value: stats.reviews,
      icon: <FaStar />,
      color: 'bg-yellow-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: <FaEnvelope />,
      color: 'bg-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null
    }
  ];

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="skeleton h-12 w-12 rounded-full mb-4"></div>
            <div className="skeleton h-4 w-24 rounded mb-2"></div>
            <div className="skeleton h-8 w-16 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">Welcome to Samarth Mobile Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`${card.iconBg} ${card.iconColor} p-4 rounded-full text-2xl relative`}>
                {card.icon}
                {card.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {card.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between">
              <span>Shop Name:</span>
              <span className="font-semibold">Samarth Mobile</span>
            </li>
            <li className="flex justify-between">
              <span>Rating:</span>
              <span className="font-semibold">4.6 ⭐</span>
            </li>
            <li className="flex justify-between">
              <span>Total Reviews:</span>
              <span className="font-semibold">189</span>
            </li>
            <li className="flex justify-between">
              <span>Phone:</span>
              <span className="font-semibold">+91 98679 63398</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700">System running smoothly</p>
            </div>
            {stats.unreadMessages > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-700">
                  {stats.unreadMessages} new message{stats.unreadMessages > 1 ? 's' : ''} pending
                </p>
              </div>
            )}
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-700">All services active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
