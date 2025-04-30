import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from '@/store/store';
import init from '@/init';
import ErrorBoundary from './components/error/ErrorBoundary';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: true,
      retryDelay: 1000,
    },
    mutations: {
      retry: false,
    },
  },
});
init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
  </StrictMode>
);
