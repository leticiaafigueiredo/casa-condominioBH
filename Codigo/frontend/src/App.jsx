import React from 'react'
import AppRouters from './components/routers/AppRouters'
import './index.css';
import { AuthProvider } from './components/contexts/AuthProvider'; 
import { NotificationProvider } from './components/contexts/NotificacaoProvider';


const App = () => {

  return (

    <AuthProvider>
      <NotificationProvider>
        <div className="App">
          <AppRouters />
        </div>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
