import { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Wallet, 
  Clock, 

  Check,

  Trash2
} from 'lucide-react';
import Layout from '../../Layout/Layout';

// --- Types ---
type NotificationType = 'transaction' | 'security' | 'system' | 'milestone';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: string; // ISO date string
  actionUrl?: string;
  amount?: string; // Optional context for escrow
}

// --- Mock Data ---
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Funds Released',
    message: 'The buyer has approved the release of funds for Milestone #2.',
    type: 'transaction',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    amount: '$1,200.00'
  },
  {
    id: '2',
    title: 'New Login Attempt',
    message: 'We detected a login from a new device (iPhone 14, London).',
    type: 'security',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    title: 'Dispute Raised',
    message: 'A dispute has been opened for Order #9921 by the buyer.',
    type: 'system', // Could be warning/alert
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Milestone Deadline Approaching',
    message: 'Milestone #3 "Final Delivery" is due in 24 hours.',
    type: 'milestone',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'transaction' | 'security'>('all');

  // --- Helpers ---
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'transaction':
        return <Wallet className="w-5 h-5 text-green-600" />;
      case 'security':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'milestone':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundIconColor = (type: NotificationType) => {
    switch (type) {
      case 'transaction': return 'bg-green-100';
      case 'security': return 'bg-red-100';
      case 'milestone': return 'bg-blue-100';
      case 'system': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  // --- Actions ---
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // --- Filtering Logic ---
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.isRead;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Layout>
    

    <div className="min-h-screen bg-gray-50 py-3 px-4 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500 mt-1">
              You have {unreadCount} unread messages
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
          {(['all', 'unread', 'transaction', 'security'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeFilter === filter 
                  ? 'bg-pri text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications found.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`
                  group relative flex items-start p-5 rounded-xl border transition-all duration-200
                  ${notification.isRead 
                    ? 'bg-white border-gray-100' 
                    : 'bg-blue-50/50 border-blue-100 shadow-sm'}
                `}
              >
                {/* Icon Box */}
                <div className={`
                  flex-shrink-0 p-3 rounded-xl mr-4 
                  ${getBackgroundIconColor(notification.type)}
                `}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-semibold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>

                  {/* Contextual Tag (e.g. Amount) */}
                  {notification.amount && (
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      {notification.amount}
                    </div>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Unread Indicator Dot (Mobile/Visual Cue) */}
                {!notification.isRead && (
                  <span className="absolute top-5 right-5 w-2 h-2 bg-blue-500 rounded-full group-hover:opacity-0 transition-opacity" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default NotificationPage;