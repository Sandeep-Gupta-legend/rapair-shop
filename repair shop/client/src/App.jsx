import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageProducts from './pages/admin/ManageProducts';
import ManageReviews from './pages/admin/ManageReviews';
import ManageMessages from './pages/admin/ManageMessages';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import PrivateRoute from './components/admin/PrivateRoute';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
        <Route path="/reviews" element={<><Navbar /><Reviews /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="messages" element={<ManageMessages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
