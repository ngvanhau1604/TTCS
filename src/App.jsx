import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Kiểm tra kỹ xem tên file trong thư mục pages của bạn viết hoa hay viết thường chữ cái đầu nha!
import LoginRegister from './pages/LoginRegister';
import AdminDashboard from './pages/AdminDashboard';
import AdminFeeCalculation from './pages/AdminFeeCalculation';
import ResidentDashboard from './pages/ResidentDashboard';
import ResidentPayment from './pages/ResidentPayment';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/fee-calculation" element={<AdminFeeCalculation />} />
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/payment" element={<ResidentPayment />} />
        <Route path="*" element={<div className="p-8 text-center font-bold">404 - Không tìm thấy trang</div>} />
      </Routes>
    </Router>
  );
}