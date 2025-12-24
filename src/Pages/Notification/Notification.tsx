import { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Wallet, 
  Clock, 
  Check,

  Loader2
} from 'lucide-react';
import Layout from '../../Layout/Layout';
import {
  useGetNotifications,
  useGetUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,


} from '../../Hooks/useNotification';



type FilterType = 'all' | 'unread' | 'transaction' | 'security';

const NotificationPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Query hooks
  const { data: notificationsData, isLoading } = useGetNotifications({
    limit: 50,
    unread_only: activeFilter === 'unread' ? true : false
  });
  const { data: unreadCount = 0 } = useGetUnreadCount();

  // Mutation hooks
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  // const deleteNotificationMutation = useDeleteNotification();
  // const deleteAllReadMutation = useDeleteAllRead();

  // --- Helpers ---
  const getIcon = (type: string) => {
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

  const getBackgroundIconColor = (type: string) => {
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
  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id.toString());
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  // --- Filtering Logic ---
  const notifications = notificationsData?.notifications || [];
  
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.is_read;
    return n.type === activeFilter;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">
                You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  disabled={markAllAsReadMutation.isPending}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                >
                  {markAllAsReadMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  Mark all as read
                </button>
              )}
              
       
            </div>
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
                    ? 'bg-pri text-white s -md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
                `}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}

          {/* Notification List */}
          {!isLoading && (
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
                      ${notification.is_read 
                        ? 'bg-white border-gray-100' 
                        : 'bg-blue-50/50 border-blue-100 s -sm'}
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
                        <p className={`text-sm font-semibold ${notification.is_read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {formatTime(notification.created_at)}
                        </span>
                      </div>
                      
                      <p className={`text-sm ${notification.is_read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.is_read && (
                        <button 
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={markAsReadMutation.isPending}
                          title="Mark as read"
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
                        >
                          {markAsReadMutation.isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      )}
              
                    </div>

                    {/* Unread Indicator Dot */}
                    {!notification.is_read && (
                      <span className="absolute top-5 right-5 w-2 h-2 bg-blue-500 rounded-full group-hover:opacity-0 transition-opacity" />
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;