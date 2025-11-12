// __tests__/pages/NotificationsPage.edge-cases.test.tsx
import React from "react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotificationsPage } from "../../pages/NotificationsPage";
import { useNotifications } from "../../hooks/useNotifications";

vi.mock("../../hooks/useNotifications");
const mockUseNotifications = vi.mocked(useNotifications);

describe("NotificationsPage Edge Cases", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles markAsRead error gracefully", async () => {
    const markAsReadMock = vi.fn().mockRejectedValue(new Error("Failed"));
    mockUseNotifications.mockReturnValue({
      notifications: [
        {
          id: "1",
          title: "Test Notification",
          message: "Test message",
          isRead: false,
          createdAt: new Date().toISOString(),
          userId: "user-1",
        },
      ],
      loading: false,
      error: null,
      pagination: {
        page: 1,
        totalPages: 1,
        total: 1,
        hasNext: false,
        hasPrev: false,
      },
      loadNotifications: vi.fn(),
      markAsRead: markAsReadMock,
      deleteNotification: vi.fn(),
    });

    render(<NotificationsPage />);

    const readButton = screen.getByRole("button", {
      name: /marcar test notification como lida/i,
    });
    fireEvent.click(readButton);

    await waitFor(() => {
      expect(markAsReadMock).toHaveBeenCalledWith("1");
    });

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("handles deleteNotification error gracefully", async () => {
    const deleteNotificationMock = vi
      .fn()
      .mockRejectedValue(new Error("Failed"));
    mockUseNotifications.mockReturnValue({
      notifications: [
        {
          id: "1",
          title: "Test Notification",
          message: "Test message",
          isRead: false,
          createdAt: new Date().toISOString(),
          userId: "",
        },
      ],
      loading: false,
      error: null,
      pagination: {
        page: 1,
        totalPages: 1,
        total: 1,
        hasNext: false,
        hasPrev: false,
      },
      loadNotifications: vi.fn(),
      markAsRead: vi.fn(),
      deleteNotification: deleteNotificationMock,
    });

    render(<NotificationsPage />);

    const deleteButton = screen.getByRole("button", {
      name: /excluir test notification/i,
    });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteNotificationMock).toHaveBeenCalledWith("1");
    });

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("does not show loading spinner when loading but notifications exist", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [
        {
          id: "1",
          title: "Test Notification",
          message: "Test message",
          isRead: false,
          createdAt: new Date().toISOString(),
          userId: "",
        },
      ],
      loading: true,
      error: null,
      pagination: {
        page: 1,
        totalPages: 1,
        total: 1,
        hasNext: false,
        hasPrev: false,
      },
      loadNotifications: vi.fn(),
      markAsRead: vi.fn(),
      deleteNotification: vi.fn(),
    });

    render(<NotificationsPage />);

    expect(
      screen.queryByText("Carregando notificações...")
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Test Notification")).not.toBeInTheDocument();
  });
});
