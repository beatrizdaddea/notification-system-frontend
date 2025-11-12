import React from 'react'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { Notification } from '../../../types/notification'

// Mock data for tests
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Test Notification 1',
    message: 'This is a test notification',
    isRead: false,
    createdAt: new Date().toISOString(),
    userId: 'user-123',
  },
  {
    id: '2', 
    title: 'Test Notification 2',
    message: 'This is another test notification',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-123',
  },
]

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'