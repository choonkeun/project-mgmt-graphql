import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Rootlayout from './pages/RootLayout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Todos from './pages/Todos';
import ClientPage from './pages/ClientPage';
import ProjectPage from './pages/ProjectPage';

import App from './App';
import NotFound from './pages/NotFound';


import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Rootlayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app" replace />, // Redirect root to /app
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/clients',
        element: <ClientPage />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/todos',
        element: <Todos />,
      }
    ]
  },

  {
    path: '/app',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const QueryClientInstance = new QueryClient();

root.render(
  <QueryClientProvider client={QueryClientInstance}>
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
