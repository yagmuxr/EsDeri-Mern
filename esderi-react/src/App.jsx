import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminUserPage from './pages/AdminUserPage';
import CategoryPage from './pages/CategoryPage';
import UpdateCategoryPage from './pages/UpdateCategoryPage';
import CreateCategoryPage from './pages/CreateCategoryPage';
import CreateProductPage from './pages/CreateProductPage';
import ProductPage from './pages/ProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import CouponPage from './pages/CouponPage';
import CreateCouponPage from './pages/CreateCouponPage';
import UpdateCouponPage from './pages/UpdateCouponPage';
import Success from './pages/Success';
import OrderPage from './pages/OrderPage';
import DashboardPage from './pages/DashboardPage';
import Orders from './pages/Orders';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin">
          <Route path="" element={<DashboardPage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/:id" element={<UpdateCategoryPage />} />
          <Route path="categories/create" element={<CreateCategoryPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<UpdateProductPage />} />
          <Route path="coupons" element={<CouponPage />} />
          <Route path="coupons/create" element={<CreateCouponPage />} />
          <Route path="coupons/:id" element={<UpdateCouponPage />} />
          <Route path="orders" element={<OrderPage />} />


        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
