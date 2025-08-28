
import VetDashboard from '../pages/VetDashboard';
import PetList from '../pages/PetList';
import Adoption from '../pages/Adoption';
import Store from '../pages/Store';
import Services from '../pages/Services';
import Vets from '../pages/Vets';
import Chatbot from '../pages/Chatbot';
import LostFound from '../pages/LostFound';
import MyAppointments from '../pages/MyAppointments';
import VetRegistrationForm from '../pages/VetRegistrationForm';
import VetDirectory from '../pages/VetDirectory';
import VetProfile from '../pages/VetProfile';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import BuyerDashboard from '../pages/BuyerDashboard';
import SellerDashboard from '../pages/SellerDashboard';
import SellerProductAdmin from '../pages/SellerProductAdmin';
import Landing from '../pages/Landing';
// ... other imports ...
import MainLayout from '../components/MainLayout';

function VetRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'vet') {
    window.location.href = '/dashboard';
    return null;
  }
  return children;
}

function BuyerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'buyer') {
    window.location.href = '/dashboard';
    return null;
  }
  return children;
}

function SellerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'seller') {
    window.location.href = '/dashboard';
    return null;
  }
  return children;
}

const AppRoutes = () => (
  <Routes>
    {/* Public routes (no layout) */}
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected routes (with MainLayout) */}
    <Route
      path="/*"
      element={
        <MainLayout>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vet-dashboard" element={<VetRoute><VetDashboard /></VetRoute>} />
            <Route path="buyer-dashboard" element={<BuyerRoute><BuyerDashboard /></BuyerRoute>} />
            <Route path="seller-dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
            <Route path="seller/products" element={<SellerRoute><SellerProductAdmin /></SellerRoute>} />
            <Route path="pets" element={<PetList />} />
            <Route path="adoption" element={<Adoption />} />
            <Route path="store" element={<Store />} />
            <Route path="services" element={<Services />} />
            <Route path="vets" element={<Vets />} />
            <Route path="vet/register" element={<VetRegistrationForm />} />
            <Route path="vets-directory" element={<VetDirectory />} />
            <Route path="vet/:id" element={<VetProfile />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="lostfound" element={<LostFound />} />
            <Route path="my-appointments" element={<MyAppointments />} />
          </Routes>
        </MainLayout>
      }
    />
  </Routes>
);

export default AppRoutes;