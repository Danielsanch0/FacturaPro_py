import React, { StrictMode } from 'react';  
import { createRoot } from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import '@fortawesome/fontawesome-free/css/all.min.css';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/auth/Register';
import Egresos from './pages/auth/Egresos';
import RegistroFac from './pages/auth/RegistroFac';
import RegistrarUsuario from './pages/RegistrarUsuario';



const router = createBrowserRouter([
  {
    path: '/',  
    element: <Home />,
  },
  {
    path: '/login',  
    element: <Login />
  },
  {
    path: '/registroFac', 
    element: <RegistroFac />
  },
  {
    path: '/register',  
    element: <Register />
  },
  {
    path: '/egresos', 
    element: <Egresos />
  },
  {
    path: '/RegistrarUsuario', 
    element: <RegistrarUsuario /> 
  }
]);

const root = createRoot(document.getElementById('app'));  
root.render(
  <StrictMode>
    <RouterProvider router={router} />  
  </StrictMode>
);

