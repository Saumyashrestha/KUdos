import React from 'react';

const AlertDialog = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in">
        <div className="space-y-4">
          <AlertDialogHeader title={title} />
          <AlertDialogContent description={description} />
          <AlertDialogFooter onClose={onClose} onConfirm={onConfirm} />
        </div>
      </div>
    </div>
  );
};

const AlertDialogHeader = ({ title }) => (
  <div className="text-center">
    <h2 className="text-xl font-semibold text-gray-900">
      {title || "Are you sure you want to delete this item?"}
    </h2>
  </div>
);

const AlertDialogContent = ({ description }) => (
  <div className="text-center">
    <p className="text-gray-500">
      {description || "This action is irreversible. Please confirm if you wish to proceed."}
    </p>
  </div>
);

const AlertDialogFooter = ({ onClose, onConfirm }) => (
  <div className="flex justify-end space-x-3 mt-6">
    <AlertDialogCancel onClose={onClose} />
    <AlertDialogAction onConfirm={onConfirm} />
  </div>
);

const AlertDialogCancel = ({ onClose }) => (
  <button
    onClick={onClose}
    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Cancel
  </button>
);

const AlertDialogAction = ({ onConfirm }) => (
  <button
    onClick={onConfirm}
    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
  >
    Confirm
  </button>
);

const AlertDialogDescription = ({ description }) => (
  <div className="text-center">
    <p className="text-gray-500">
      {description || "This action is irreversible. Please confirm if you wish to proceed."}
    </p>
  </div>
);

const AlertDialogTitle = ({ title }) => (
  <div className="text-center">
    <h2 className="text-xl font-semibold text-gray-900">
      {title || "Are you sure you want to delete this item?"}
    </h2>
  </div>
);



export { 
  AlertDialog, 
  AlertDialogHeader, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction, 
  AlertDialogDescription, 
  AlertDialogTitle 
};
