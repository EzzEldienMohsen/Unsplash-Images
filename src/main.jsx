import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from '../components/Context';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
var queryClient = new QueryClient();
// queryClient.setQueryData(['images'], (data) => ({
//   pages: data.pages.slice(1),
//   pageParams: data.pageParams.slice(1),
// }));
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </AppProvider>
);
