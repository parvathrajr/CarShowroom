import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import CarDetail from './pages/CarDetail.jsx';
import Admin from './pages/Admin.jsx';
import Inventory from './pages/Inventory.jsx';
import Login from './pages/Login.jsx';

function AdminRoute() {
  return sessionStorage.getItem('luxora-admin') === 'verified' && sessionStorage.getItem('luxora-admin-token')
    ? <Admin />
    : <Navigate to="/login" replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/' || pathname === '/login';
  return (
    <>
      <ScrollManager />
      {!isLogin && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Login />} />
      </Routes>
      {!isLogin && <Footer />}
    </>
  );
}
