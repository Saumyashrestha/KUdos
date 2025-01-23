
// Toaster.jsx
import React from 'react'
import { Toast, ToastProvider, ToastViewport } from './Toast'
import { useToast } from './usetoaster'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, duration, variant, isLoading }) {
        return (
          <Toast
            key={id}
            variant={variant}
            duration={duration}
            title={title}
            description={description}
            isLoading={isLoading}
        
          />
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}