import { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { contactAPI } from '../../services/apiService';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getMessages();
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.deleteMessage(id);
        toast.success('Message deleted successfully');
        fetchMessages();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const viewMessage = async (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      try {
        await contactAPI.getMessage(message._id);
        fetchMessages();
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Messages</h2>
        <p className="text-gray-600 mt-2">View and manage contact form submissions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : messages.length === 0 ? (
              <p className="p-6 text-center text-gray-600">No messages yet</p>
            ) : (
              <div className="divide-y">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    onClick={() => viewMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?._id === message._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {message.read ? (
                          <FaEnvelopeOpen className="text-gray-400" />
                        ) : (
                          <FaEnvelope className="text-blue-600" />
                        )}
                        <h4 className={`font-semibold ${!message.read ? 'text-blue-600' : ''}`}>
                          {message.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="md:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedMessage.name}
                  </h3>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  <p className="text-gray-600">{selectedMessage.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={20} />
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-2">Message:</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="border-t mt-6 pt-4">
                <p className="text-sm text-gray-500">
                  Received on: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 flex space-x-4">
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="btn btn-primary"
                >
                  Call Customer
                </a>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="btn btn-secondary"
                >
                  Send Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
              <FaEnvelope size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;
