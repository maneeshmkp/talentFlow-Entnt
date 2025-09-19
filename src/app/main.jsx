import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.js';
import { router } from './router.jsx';
import "../styles/globals.css";

// Start MSW in browser for dev
if (import.meta.env.DEV) {
  const { worker } = await import('../api/msw.js');
  await worker.start({ 
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/mockServiceWorker.js' }
   });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);
 