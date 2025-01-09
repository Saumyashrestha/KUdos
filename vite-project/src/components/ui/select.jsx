// Select Components
export function Select({ className = '', children, ...props }) {
    return (
      <div className={`relative ${className}`} {...props}>
        {children}
      </div>
    );
  }
  
  export function SelectTrigger({ className = '', error, children, ...props }) {
    return (
      <button
        type="button"
        className={`
          relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
    );
  }
  
  export function SelectContent({ className = '', children, ...props }) {
    return (
      <div
        className={`
          absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg
          ring-1 ring-black ring-opacity-5 focus:outline-none
          ${className}
        `}
        {...props}
      >
        <div className="max-h-60 overflow-auto py-1">{children}</div>
      </div>
    );
  }
  
  export function SelectItem({ className = '', children, ...props }) {
    return (
      <div
        className={`
          relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm
          hover:bg-blue-50 text-gray-900
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function SelectValue({ placeholder, value }) {
    return (
      <span className="block truncate">
        {value || <span className="text-gray-400">{placeholder}</span>}
      </span>
    );
  }