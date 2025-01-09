import React from 'react';

// Alert Component
export function Alert({ className = '', variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200',
    success: 'bg-green-50 border-l-4 border-green-500 text-green-700 dark:bg-green-900/50 dark:text-green-200',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-200',
    destructive: 'bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:text-red-200'
  };

  return (
    <div
      className={`flex items-start p-4 rounded-lg shadow-sm ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}

// AlertDescription Component
export function AlertDescription({ className = '', children, ...props }) {
  return (
    <div
      className={`ml-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}