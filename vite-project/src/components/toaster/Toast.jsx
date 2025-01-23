// Toast.jsx
import * as React from "react"
import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

export const ToastProvider = ({ children }) => {
  return <>{children}</>
}

export const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="fixed bottom-0 right-0 top-auto z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col md:max-w-[420px]"
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

export const Toast = React.forwardRef(({ 
  className, 
  variant = "default", 
  title,
  description,
  isLoading,
  duration = 5000, 
  onDismiss,
  ...props 
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const variants = {
    // default: {
    //   base: "bg-white border-slate-200",
    //   icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, 
    //   title: "text-slate-900",
    //   description: "text-slate-600"
    // },
    success: {
      base: "bg-green-100 border-green-200", 
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "text-green-800",
      description: "text-green-700"
    },
    error: {
      base: "bg-red-50 border-red-200",
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      title: "text-red-800",
      description: "text-red-700"
    },
    // warning: {
    //   base: "bg-amber-50 border-amber-200",
    //   icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    //   title: "text-amber-800",
    //   description: "text-amber-700"
    // },
    loading: {
      base: "bg-blue-50 border-blue-200",
      icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
      title: "text-blue-800",
      description: "text-blue-700"
    }
  }

  const currentVariant = isLoading ? variants.loading : variants[variant]

  return (
    <div
      ref={ref}
      className={`
        group pointer-events-auto relative flex w-full items-start gap-4 overflow-hidden border p-4 shadow-lg transition-all duration-300 
        data-[state=open]:animate-in data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
        data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full 
        ${currentVariant.base}
      `}
      {...props}
    >
      {currentVariant.icon}
      <div className="flex-1 space-y-1">
        {title && (
          <div className={`font-medium ${currentVariant.title}`}>
            {title}
          </div>
        )}
        {description && (
          <div className={`text-sm ${currentVariant.description}`}>
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        className={`
          absolute right-2 top-2 rounded-md p-1 opacity-0 
          transition-opacity hover:bg-slate-900/5 
          group-hover:opacity-100
          ${currentVariant.description}
        `}
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  )
})
Toast.displayName = "Toast"
