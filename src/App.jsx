import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CookieProvider } from './context/CookieContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import CookieButton from './components/CookieButton';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
            <OrderProvider>
              <CookieProvider>
                <div className="app">
                  <Header />
                  <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminHomePage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUsersPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <AdminProductsPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <AdminOrdersPage />
                      </AdminRoute>
                    }
                  />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfUsePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                  <Footer />
                  <CookieBanner />
                  <CookieButton />
                </div>
              </CookieProvider>
            </OrderProvider>
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
