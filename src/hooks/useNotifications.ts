import { useState, useCallback } from 'react';
import type { Notification, PaginatedResponse } from '../types/notification';
import { getNotifications, markAsRead, deleteNotification } from '../api/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });

  const loadNotifications = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Notification> = await getNotifications(page);
      
      setNotifications(response.data);
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
        hasNext: response.hasNext,
        hasPrev: response.hasPrev,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar notificações');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      setError(null);
      await markAsRead(id);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      setError('Falha ao marcar como lida');
      await loadNotifications(pagination.page);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteNotification(id);
      setNotifications(prev => prev.filter(notif => notif.id !== id));
      if (notifications.length === 1 && pagination.page > 1) {
        await loadNotifications(pagination.page - 1);
      } else {
        await loadNotifications(pagination.page);
      }
    } catch (err) {
      setError('Falha ao remover notificação');
      await loadNotifications(pagination.page);
      throw err;
    }
  };

  return {
    notifications,
    loading,
    error,
    pagination,
    loadNotifications,
    markAsRead: handleMarkAsRead,
    deleteNotification: handleDelete,
  };
};