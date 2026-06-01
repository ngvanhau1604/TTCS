import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import cấu hình phân hệ hệ thống chung
import LoginRegister from './pages/LoginRegister'; 

// Import các trang thuộc phân hệ quản trị (Admin)
import AdminDashboard from './pages/AdminDashboard';
import AdminResidents from './pages/AdminResidents';
import AdminFeeCalculation from './pages/AdminFeeCalculation';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminDisputes from './pages/AdminDisputes';

// Import các trang thuộc phân hệ dành cho cư dân (Resident)
import ResidentDashboard from './pages/ResidentDashboard';
import ResidentPayment from './pages/ResidentPayment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Điều hướng mặc định ban đầu về trang đăng nhập hệ thống */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Phân hệ xác thực tài khoản */}
        <Route path="/login" element={<LoginRegister />} />
        
        {/* ROUTE DÀNH CHO CƯ DÂN (MỚI BỔ SUNG ĐỂ SỬA LỖI ĐIỀU HƯỚNG) */}
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/payment" element={<ResidentPayment />} />
        
        {/* Phân hệ quản trị vận hành của Ban Quản Lý (Admin) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/residents" element={<AdminResidents />} />
        <Route path="/admin/fee-calculation" element={<AdminFeeCalculation />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />
        
        {/* Bẫy lỗi bảo vệ khi người dùng nhập sai URL */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-sans">
            Trang không tồn tại.
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}