import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/base.css';
import routes from './routes.tsx';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      {/* {import.meta.env.DEV && <ReactQueryDevtools />} */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
