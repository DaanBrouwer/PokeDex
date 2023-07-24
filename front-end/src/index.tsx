import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const container = document.getElementById('root');
const root = createRoot(container!);

const client = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
