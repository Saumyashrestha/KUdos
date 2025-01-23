import React from 'react';

// AlertDialog Component
const AlertDialog = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay">
      <div className="alert-dialog-container">
        <AlertDialogHeader title={title} />
        <AlertDialogContent description={description} />
        <AlertDialogFooter onClose={onClose} onConfirm={onConfirm} />
      </div>
    </div>
  );
};

// AlertDialog Subcomponents
const AlertDialogHeader = ({ title }) => (
  <div className="alert-dialog-header">
    <h3>{title || "Are you sure you want to delete this item?"}</h3>
  </div>
);

const AlertDialogContent = ({ description }) => (
  <div className="alert-dialog-content">
    <p>{description || "This action is irreversible. Please confirm if you wish to proceed."}</p>
  </div>
);

const AlertDialogFooter = ({ onClose, onConfirm }) => (
  <div className="alert-dialog-footer">
    <AlertDialogCancel onClose={onClose} />
    <AlertDialogAction onConfirm={onConfirm} />
  </div>
);

const AlertDialogCancel = ({ onClose }) => (
  <button className="alert-dialog-button cancel" onClick={onClose}>
    Cancel
  </button>
);

const AlertDialogAction = ({ onConfirm }) => (
  <button className="alert-dialog-button confirm" onClick={onConfirm}>
    Confirm
  </button>
);

const AlertDialogDescription = ({ description }) => (
  <p>{description || "This action is irreversible. Please confirm if you wish to proceed."}</p>
);

const AlertDialogTitle = ({ title }) => (
  <h3>{title || "Are you sure you want to delete this item?"}</h3>
);

// New Alert Component
const Alert = ({ children }) => (
  <div className="alert">
    <div className="alert-container">
      {children}
    </div>
  </div>
);

// New AlertDescription Component
const AlertDescription = ({ description }) => (
  <div className="alert-description">
    <p>{description}</p>
  </div>
);

const AlertDialogTrigger = () => {
  return (
    <button>
      Open Alert Dialog
    </button>
  );
};


// Export Components
export {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTitle,
  Alert,
  AlertDescription,
  AlertDialogTrigger
};
