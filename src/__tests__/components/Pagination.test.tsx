import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, test } from "vitest";
import { Pagination } from '../../components/Pagination';
import { mockNotifications } from "../setup/utils/test-utils";


describe('Pagination component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders pagination info and total pages', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        hasNext={true}
        hasPrev={true}
        onPageChange={() => {}}
      />
    );

    // Component text is in Portuguese; tests descriptions are in English
    expect(screen.getByText(/Total de páginas: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Página 2 de 5/i)).toBeInTheDocument();
  });

  test('previous button is disabled when there is no previous page and next works', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        hasNext={true}
        hasPrev={false}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /Anterior/i });
    const nextButton = screen.getByRole('button', { name: /Próxima/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();

    // Click next should call onPageChange with page 2
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('next button is disabled when there is no next page and previous works', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        hasNext={false}
        hasPrev={true}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /Anterior/i });
    const nextButton = screen.getByRole('button', { name: /Próxima/i });

    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeEnabled();

    // Click previous should call onPageChange with page 4
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
