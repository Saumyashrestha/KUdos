// src/components/ui/demoComponents.jsx
import React from 'react';

// Input Component
// Input Component
export function Input({ className = '', error, ...props }) {
    return (
      <input
        className={`
          w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:bg-gray-50
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
    );
  }