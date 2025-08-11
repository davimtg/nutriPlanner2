import { useEffect } from 'react';
import { Icon } from '../Icon.jsx';

const Toast = ({ toast, onRemove }) => {
  const { id, message, type, duration } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const getToastStyles = () => {
    const baseStyles = "fixed bottom-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 animate-toastIn z-50";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-emerald-200 bg-emerald-50`;
      case 'error':
        return `${baseStyles} border-red-200 bg-red-50`;
      case 'warning':
        return `${baseStyles} border-orange-200 bg-orange-50`;
      default:
        return `${baseStyles} border-slate-200 bg-slate-50`;
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'check';
      case 'error':
        return 'x';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'info';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-orange-800';
      default:
        return 'text-slate-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-orange-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          <Icon name={getIconName()} size={20} />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`inline-flex ${getTextColor()} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
            onClick={() => onRemove(id)}
          >
            <span className="sr-only">Fechar</span>
            <Icon name="x" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Toast;

