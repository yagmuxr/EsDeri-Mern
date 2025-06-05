import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from "./layouts/Layout";
import CartProvider from './context/CartProvider.jsx';
import ScrollToTop from './components/scrollToTop';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <CartProvider>
          <Layout>
          <App />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
