import React, { createContext, useContext, useState } from 'react';
import Notification from '../common/Notificacao';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
  };

  const closeNotification = () => setNotification({ message: '', type: '' });

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
