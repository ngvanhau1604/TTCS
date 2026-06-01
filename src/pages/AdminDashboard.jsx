import React, { useState } from 'react';
import { 
  Building2, LayoutDashboard, Users, FileText, BarChart3, Settings, 
  Bell, Search, DollarSign, CheckCircle, AlertTriangle, MessageSquare,
  ArrowUpRight, TrendingUp, Filter, ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  // Giả lập danh sách hóa đơn mới nhất cần quản lý
  const [recentInvoices, setRecentInvoices] = useState([
    { id: "HD-2026-001", room: "P102", type: "Phí dịch vụ + Điện nước", amount: "2,450,000", status: "Paid", date: "31/05/2026" },
    { id: "HD-2026-002", room: "P504", type: "Phí quản lý tháng 5", amount: "1,200,000", status: "Unpaid", date: "30/05/2026" },
    { id: "HD-2026-003", room: "P312", type: "Phí gửi xe máy/ô tô", amount: "850,000", status: "Pending", date: "29/05/2026" },
    { id: "HD-2026-004", room: "P701", type: "Phí dịch vụ tổng hợp", amount: "3,110,000", status: "Paid", date: "28/05/2026" },
    { id: "HD-2026-005", room: "P208", type: "Phí điện nước tiêu thụ", amount: "1,680,000", status: "Unpaid", date: "28/05/2026" }
  ]);

  // Giả lập dữ liệu biểu đồ cột thu phí theo tầng/khu vực hoặc theo tháng
  const chartData = [
    { month: 'T1', value: 65 },
    { month: 'T2', value: 78 },
    { month: 'T3', value: 85 },
    { month: 'T4', value: 92 },
    { month: 'T5 (HT)', value: 74 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased font-sans">
      
      {/* 1. SIDEBAR CỐ ĐỊNH BÊN TRÁI */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
        {/* Brand Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-md">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-wider uppercase">SmartFee BQL</span>
        </div>

        {/* Danh sách các Tab Menu điều hướng */}
        <nav className="flex-1 p-4 space-y-1.5">
          <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>Bảng điều khiển</span>
          </a>
          <a href="#residents" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Users className="w-5 h-5" />
            <span>Quản lý cư dân</span>
          </a>
          <a href="#fees" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <FileText className="w-5 h-5" />
            <span>Hóa đơn & Nộp phí</span>
          </a>
          <a href="#analytics" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <BarChart3 className="w-5 h-5" />
            <span>Thống kê tài chính</span>
          </a>
          <a href="#disputes" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all flex justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span>Xử lý tranh chấp</span>
            </div>
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">3</span>
          </a>
        </nav>

        {/* Profile Admin rút gọn ở chân Sidebar */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Trần Quốc Bảo</p>
            <p className="text-xs text-slate-500">Trưởng ban quản lý</p>
          </div>
        </div>
      </aside>

      {/* WORKSPACE CHÍNH BÊN PHẢI */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* 2. HEADER TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-bold text-slate-900 hidden md:block">Tổng quan vận hành</h1>
            {/* Ô tìm kiếm nhanh */}
            <div className="relative w-full max-w-xs md:max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Tìm mã căn hộ, tên cư dân..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Các nút hành động góc phải */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl relative transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4 text-slate-500" />
              <span>Tháng 05/2026</span>
            </button>
          </div>
        </header>

        {/* 3. VÙNG NỘI DUNG CHÍNH (MAIN CONTENT) */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* KHỐI CÁC THẺ CHỈ SỐ KPI METRICS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Tổng doanh thu */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doanh thu thu về</span>
                <p className="text-2xl font-black text-slate-900">428.5M đ</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg w-max">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+12.4% so với T4</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            {/* Card 2: Tiến độ thu phí */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến độ thu phí</span>
                <p className="text-2xl font-black text-slate-900">84.2 %</p>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Căn hộ nợ phí */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Căn hộ chưa nộp</span>
                <p className="text-2xl font-black text-slate-900">32 / 240</p>
                <span className="text-xs text-slate-400 font-medium block">Cần gửi thông báo nhắc phí</span>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>

            {/* Card 4: Tranh chấp/Khiếu nại */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tranh chấp cần xử lý</span>
                <p className="text-2xl font-black text-slate-900">03 vụ</p>
                <span className="text-xs font-bold text-rose-600 underline cursor-pointer flex items-center gap-0.5">
                  Xem chi tiết <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
          </section>

          {/* KHỐI BIỂU ĐỒ VÀ TIẾN ĐỘ THU CHI */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Biểu đồ HTML/CSS trực quan */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Thống kê tỷ lệ hoàn thành thu phí dịch vụ</h3>
                  <p className="text-xs text-slate-400">Hiển thị dữ liệu tăng trưởng tích lũy theo phần trăm (%)</p>
                </div>
              </div>
              
              {/* Giả lập đồ thị dạng Bar chart cột đứng */}
              <div className="h-48 flex items-end justify-between pt-6 px-4 border-b border-slate-100">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-12 bg-slate-100 rounded-t-lg relative flex items-end h-full transition-all group-hover:bg-slate-200">
                      <div 
                        className="bg-blue-600 w-full rounded-t-lg transition-all duration-500 group-hover:bg-blue-700 relative"
                        style={{ height: `${data.value}%` }}
                      >
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.value}%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget thông tin nhanh / Tiện ích nội khu */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">Thông báo từ BQL tòa nhà</h3>
                <p className="text-xs text-slate-400">Các hoạt động gửi diện rộng gần đây tới cư dân.</p>
              </div>
              
              <div className="space-y-3 flex-1 my-3 overflow-y-auto max-h-[160px] pr-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-blue-600">Thông báo chốt số điện nước T5</span>
                  <p className="text-slate-600 line-clamp-1">Yêu cầu cư dân kiểm tra đối chiếu chỉ số công tơ...</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-slate-700">Lịch bảo trì thang máy tòa A</span>
                  <p className="text-slate-600 line-clamp-1">Tạm dừng hoạt động thang số 03 từ 14h - 16h ngày...</p>
                </div>
              </div>

              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5">
                <span>Tạo thông báo mới</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 4. BẢNG DANH SÁCH HÓA ĐƠN GẦN ĐÂY */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Các hóa đơn phát sinh gần nhất</h3>
                <p className="text-xs text-slate-400">Cập nhật real-time các hoạt động đóng phí từ cổng thanh toán</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl transition-all">
                Xem toàn bộ hóa đơn
              </button>
            </div>

            {/* Table Container Responsive */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-5">Mã hóa đơn</th>
                    <th className="py-3 px-5">Căn hộ</th>
                    <th className="py-3 px-5">Loại phí dịch vụ</th>
                    <th className="py-3 px-5 text-right">Số tiền (đ)</th>
                    <th className="py-3 px-5">Ngày tạo</th>
                    <th className="py-3 px-5 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50/70 transition-all">
                      <td className="py-3.5 px-5 font-mono text-xs font-bold text-slate-500">{invoice.id}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-900">{invoice.room}</td>
                      <td className="py-3.5 px-5 text-slate-600 text-xs">{invoice.type}</td>
                      <td className="py-3.5 px-5 text-right font-black text-slate-900">{invoice.amount}</td>
                      <td className="py-3.5 px-5 text-slate-400 text-xs">{invoice.date}</td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${
                          invoice.status === 'Paid' 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                            : invoice.status === 'Unpaid'
                            ? 'bg-rose-50 border-rose-100 text-rose-700'
                            : 'bg-amber-50 border-amber-100 text-amber-700'
                        }`}>
                          {invoice.status === 'Paid' ? 'Đã nộp' : invoice.status === 'Unpaid' ? 'Chưa nộp' : 'Chờ duyệt'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}