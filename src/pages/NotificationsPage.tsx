// pages/NotificationsPage.tsx
import React, { useEffect, useState } from "react";
import { FiBell, FiInbox, FiAlertCircle } from 'react-icons/fi';
import { NotificationCard } from "../components/NotificationCard";
import { Pagination } from "../components/Pagination";
import { useNotifications } from "../hooks/useNotifications";

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    pagination,
    loadNotifications,
    markAsRead,
    deleteNotification,
  } = useNotifications();

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications(1);
  }, [loadNotifications]);

  const handlePageChange = (page: number) => {
    loadNotifications(page);
  };

  const handleMarkRead = async (id: string) => {
    setActionLoading(id);
    try {
      await markAsRead(id);
    } catch (err) {
      // Error já é tratado no hook
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await deleteNotification(id);
    } catch (err) {
      // Error já é tratado no hook
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiBell className="text-xl text-gray-700 mr-2" aria-hidden="true" />
              Notificações
            </h1>
            <p className="text-gray-600 mt-1">Gerencie suas notificações</p>
          </div>

          {/* Error Message */}
          {error && (
              <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <FiAlertCircle className="text-red-500 mr-2" aria-hidden="true" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && notifications.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">
                Carregando notificações...
              </span>
            </div>
          )}

          {/* Empty State */}
          {!loading && notifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-blue-400">
                <FiInbox aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-gray-500">
                Você está em dia! Quando tiver novas notificações, elas
                aparecerão aqui.
              </p>
            </div>
          )}

          {/* Notifications List */}
          {!loading && notifications.length > 0 && (
            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                    isLoading={actionLoading === notification.id}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNext={pagination.hasNext}
                  hasPrev={pagination.hasPrev}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && notifications.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Mostrando {notifications.length} de {pagination.total}{" "}
              notificaçõe(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
