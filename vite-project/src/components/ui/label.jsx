// src/components/ui/demoComponents.jsx
import React from 'react';

// Label Component
export function Label({ className = '', required, children, ...props }) {
    return (
      <label
        className={`block text-sm font-medium text-gray-700 dark:text-gray-200 ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
  