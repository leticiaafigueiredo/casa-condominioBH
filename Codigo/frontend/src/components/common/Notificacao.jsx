import React, { useState } from 'react';

const Notificacao = ({ message, type, onClose }) => {
  if (!message) return null;

  const alertClass = `alert alert-${type} alert-dismissible fade show`;

  return (
    <div className={alertClass} role="alert" style={{ position: 'fixed', top: '10px', right: '600px', zIndex: 1050 }}>
      {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

export const useNotification = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
  };

  const closeNotification = () => setNotification({ message: '', type: '' });

  return { notification, showNotification, closeNotification };
};

export default Notificacao;
