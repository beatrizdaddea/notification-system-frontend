import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../setup/utils/test-utils";
import { NotificationCard } from "../../components/NotificationCard";
import { mockNotifications } from "../setup/utils/test-utils";

const mockNotification = mockNotifications[0];
const mockOnMarkRead = vi.fn();
const mockOnDelete = vi.fn();

const defaultProps = {
  notification: mockNotification,
  onMarkRead: mockOnMarkRead,
  onDelete: mockOnDelete,
  isLoading: false,
};

describe("NotificationCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders notification information correctly", () => {
    render(<NotificationCard {...defaultProps} />);

    expect(screen.getByText("Test Notification 1")).toBeInTheDocument();
    expect(screen.getByText("This is a test notification")).toBeInTheDocument();
    expect(screen.getByText("NOVA")).toBeInTheDocument();
  });

  it('renders read notification without "NOVA" badge', () => {
    const readNotification = { ...mockNotification, isRead: true };
    render(
      <NotificationCard {...defaultProps} notification={readNotification} />
    );

    expect(screen.queryByText("NOVA")).not.toBeInTheDocument();
    expect(screen.getByText("Lida")).toBeInTheDocument();
  });

  it('calls onMarkRead when "Ler" button is clicked', async () => {
    mockOnMarkRead.mockResolvedValue(undefined);

    render(<NotificationCard {...defaultProps} />);

    const readButton = screen.getByRole("button", {
      name: /marcar test notification 1 como lida/i,
    });
    fireEvent.click(readButton);

    await waitFor(() => {
      expect(mockOnMarkRead).toHaveBeenCalledWith(mockNotification.id);
    });
  });

  it('calls onDelete when "Excluir" button is clicked', async () => {
    mockOnDelete.mockResolvedValue(undefined);

    render(<NotificationCard {...defaultProps} />);

    const deleteButton = screen.getByRole("button", {
      name: /excluir test notification 1/i,
    });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockNotification.id);
    });
  });

  it("disables buttons when isLoading is true", () => {
    render(<NotificationCard {...defaultProps} isLoading={true} />);

    const readButton = screen.getByRole("button", {
      name: /marcar test notification 1 como lida/i,
    });
    const deleteButton = screen.getByRole("button", {
      name: /excluir test notification 1/i,
    });

    expect(readButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });

  it('does not show "Ler" button for read notifications', () => {
    const readNotification = { ...mockNotification, isRead: true };
    render(
      <NotificationCard {...defaultProps} notification={readNotification} />
    );

    expect(
      screen.queryByRole("button", {
        name: /marcar test notification 1 como lida/i,
      })
    ).not.toBeInTheDocument();
  });

  it("applies correct styling for unread notifications", () => {
    render(<NotificationCard {...defaultProps} />);

    const card = screen
      .getByText(mockNotification.title)
      .closest('div[class*="border-l-4"]');
    expect(card).toHaveClass("border-blue-500", "bg-blue-50");
  });

  it("applies correct styling for read notifications", () => {
    const readNotification = { ...mockNotification, isRead: true };
    render(
      <NotificationCard {...defaultProps} notification={readNotification} />
    );

    const card = screen
      .getByText(readNotification.title)
      .closest('div[class*="border-l-4"]');
    expect(card).toHaveClass("border-gray-300", "bg-white");
  });

  it("shows calendar icon and formatted date", () => {
    render(<NotificationCard {...defaultProps} />);

    expect(screen.getByText("Agora mesmo")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument(); // Calendar icon
  });

  it("shows correct status badge for read notification", () => {
    const readNotification = { ...mockNotification, isRead: true };
    render(
      <NotificationCard {...defaultProps} notification={readNotification} />
    );

    const statusBadge = screen.getByText("Lida");
    expect(statusBadge).toHaveClass("bg-gray-100", "text-gray-600");
  });

  it("shows correct status badge for unread notification", () => {
    render(<NotificationCard {...defaultProps} />);

    const statusBadge = screen.getByText("Não lida");
    expect(statusBadge).toHaveClass("bg-green-100", "text-green-800");
  });
});
