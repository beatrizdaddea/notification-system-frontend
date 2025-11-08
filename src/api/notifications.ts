import type { Notification, PaginatedResponse } from '../types/notification';

// Dados mockados
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bem-vindo ao Sistema',
    message: 'Sua conta foi criada com sucesso!',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
    userId: 'user-123'
  },
  {
    id: '2',
    title: 'Atualização Disponível',
    message: 'Uma nova versão do app está disponível',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    userId: 'user-123'
  },
  {
    id: '3',
    title: 'Lembrete de Reunião',
    message: 'Você tem uma reunião em 30 minutos',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutos atrás
    userId: 'user-123'
  },
  {
    id: '4',
    title: 'Pagamento Confirmado',
    message: 'Seu pagamento foi processado com sucesso',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hora atrás
    userId: 'user-123'
  },
  {
    id: '5',
    title: 'Alteração de Senha',
    message: 'Sua senha foi alterada recentemente',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    userId: 'user-123'
  }
];

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getNotifications = async (page: number = 1, limit: number = 5): Promise<PaginatedResponse<Notification>> => {
  await delay(800); // Simular latência da rede
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = mockNotifications.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: mockNotifications.length,
    page,
    totalPages: Math.ceil(mockNotifications.length / limit),
    hasNext: endIndex < mockNotifications.length,
    hasPrev: page > 1,
  };
};

export const markAsRead = async (id: string): Promise<void> => {
  await delay(300);
  
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
  } else {
    throw new Error('Notificação não encontrada');
  }
};

export const deleteNotification = async (id: string): Promise<void> => {
  await delay(300);
  
  const index = mockNotifications.findIndex(n => n.id === id);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
  } else {
    throw new Error('Notificação não encontrada');
  }
};