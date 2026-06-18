import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Users, BarChart3, Calculator,
  TrendingUp, TrendingDown, DollarSign, Download,
  MessageSquare // <-- Đã thêm icon này vào để tránh lỗi trắng trang
} from 'lucide-react';
import { apiFetch } from '../utils/api';

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [disputesCount, setDisputesCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiFetch('/api/invoices');
        setInvoices(data);
        const disputes = await apiFetch('/api/service-requests?status=PENDING');
        setDisputesCount(disputes.length);
      } catch (err) {
        console.error("Lỗi tải báo cáo phân tích:", err);
      }
    }
    loadData();
  }, []);

  // Tính toán dữ liệu tài chính từ invoices
  const totalExpected = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  const elecSum = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + (inv.electricFee || 0), 0);
  const elecTotal = invoices.reduce((sum, inv) => sum + (inv.electricFee || 0), 0);
  const elecRatio = elecTotal > 0 ? Math.round((elecSum / elecTotal) * 100) : 0;

  const waterSum = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + (inv.waterFee || 0), 0);
  const waterTotal = invoices.reduce((sum, inv) => sum + (inv.waterFee || 0), 0);
  const waterRatio = waterTotal > 0 ? Math.round((waterSum / waterTotal) * 100) : 0;

  const mgmtSum = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + (inv.managementFee || 0), 0);
  const mgmtTotal = invoices.reduce((sum, inv) => sum + (inv.managementFee || 0), 0);
  const mgmtRatio = mgmtTotal > 0 ? Math.round((mgmtSum / mgmtTotal) * 100) : 0;

  const analyticsData = [
    { title: "Tổng thu phí quản lý", amount: mgmtSum.toLocaleString('vi-VN'), ratio: mgmtRatio, color: "bg-blue-600" },
    { title: "Tổng thu tiền điện hộ dân", amount: elecSum.toLocaleString('vi-VN'), ratio: elecRatio, color: "bg-amber-500" },
    { title: "Tổng thu nước sinh hoạt", amount: waterSum.toLocaleString('vi-VN'), ratio: waterRatio, color: "bg-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-md"><Building2 className="w-5 h-5" /></div>
          <span className="text-lg font-bold uppercase tracking-wider">SmartFee BQL</span>
        </div>
        <nav className="flex-1 p-5 space-y-1.5">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" /> <span>Bảng điều khiển</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/residents')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Users className="w-5 h-5" /> <span>Quản lý cư dân</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/fee-calculation')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Calculator className="w-5 h-5" /> <span>Tính phí căn hộ</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/analytics')} className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl transition-all">
            <BarChart3 className="w-5 h-5" /> <span>Thống kê tài chính</span>
          </button>
          {/* BUTTON XỬ LÝ TRANH CHẤP ĐÃ ĐƯỢC THÊM HOÀN CHỈNH */}
          <button type="button" onClick={() => navigate('/admin/disputes')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span>Xử lý tranh chấp</span>
            </div>
            {disputesCount > 0 && (
              <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{disputesCount}</span>
            )}
          </button>
        </nav>
      </aside>

      {/* WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-xl font-bold text-slate-900">Báo cáo tài chính &amp; Doanh số</h1>
          <button onClick={() => alert("Đang kết xuất tệp tài chính...")} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl">
            <Download className="w-4 h-4" /> <span>Xuất file kế toán (Excel)</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tổng quỹ thu dự kiến</span>
                <p className="text-3xl font-black text-slate-900">{totalExpected.toLocaleString('vi-VN')} đ</p>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg inline-flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Cập nhật tự động</span>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign className="w-6 h-6" /></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chi phí vận hành tòa nhà</span>
                <p className="text-3xl font-black text-slate-900">142,300,000 đ</p>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg inline-flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Tiết kiệm 1.5%</span>
              </div>
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl"><TrendingDown className="w-6 h-6" /></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Tiến độ thu tiền theo hạng mục dịch vụ</h3>
            <div className="space-y-4">
              {analyticsData.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700"><span>{item.title}</span><span>{item.amount}đ ({item.ratio}%)</span></div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.ratio}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}