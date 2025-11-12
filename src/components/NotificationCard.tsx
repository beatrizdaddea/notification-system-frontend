import React from 'react';
import type { Notification } from '../types/notification';
import { FiCalendar, FiCheck, FiTrash2 } from 'react-icons/fi';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div
      className={`
        border-l-4 rounded-r-lg p-4 shadow-sm transition-all duration-200
        ${notification.isRead ? 'border-gray-300 bg-white' : 'border-blue-500 bg-blue-50'}
        ${isLoading ? 'opacity-60' : 'opacity-100'}
        hover:shadow-md
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <div className="flex items-center space-x-2 mb-1">
            <h3
              className={`font-semibold text-lg ${
                notification.isRead ? 'text-gray-800' : 'text-blue-800'
              }`}
            >
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                NOVA
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-2 leading-relaxed">{notification.message}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-gray-400" aria-hidden="true" />
              <span>{formatDate(notification.createdAt)}</span>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs ${
                notification.isRead ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-800'
              }`}
            >
              {notification.isRead ? 'Lida' : 'Não lida'}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 min-w-[100px]">
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              disabled={isLoading}
              aria-label={`Marcar ${notification.title} como lida`}
              className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <FiCheck aria-hidden="true" className="w-4 h-4" />
              <span>Ler</span>
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            disabled={isLoading}
            aria-label={`Excluir ${notification.title}`}
            className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <FiTrash2 aria-hidden="true" className="w-4 h-4" />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
