import React from 'react';
import { CreditCard, History, CheckCircle2, XCircle, ArrowUpRight, Download, Calendar, User, Home } from 'lucide-react';

export default function ResidentDashboard() {
  // Giả lập lịch sử nộp tiền của cư dân
  const historyInvoices = [
    { id: "INV-2026-04", period: "Tháng 04/2026", amount: "1,890,000", date: "05/04/2026", status: "success" },
    { id: "INV-2026-03", period: "Tháng 03/2026", amount: "2,150,000", date: "04/03/2026", status: "success" },
    { id: "INV-2026-02", period: "Tháng 02/2026", amount: "1,560,000", date: "06/02/2026", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* CARD PROFILE CƯ DÂN RÚT GỌN */}
        <header className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900">Cư dân: Nguyễn Văn A</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Phòng P102 - Block Tòa nhà Landmark
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Ngày cập nhật dữ liệu</span>
            <span className="text-xs font-semibold text-slate-700">Hôm nay, 31/05/2026</span>
          </div>
        </header>

        {/* KHỐI CHÍNH CHIA 3 CỘT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CỘT TRÁI: THẺ TỔNG HỢP NỢ HIỆN TẠI (WIDGET ACTION CARD) */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 border border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Dư nợ tháng này cần nộp</span>
              <p className="text-3xl font-black tracking-tight">2,300,000 đ</p>
              <p className="text-[11px] text-slate-400">Hạn chót đóng tiền: Trước 10/06/2026</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-slate-300">
              Hệ thống sẽ tự động gửi biên lai SMS/Zalo ngay khi tài khoản ngân hàng của BQL ghi nhận số dư.
            </div>

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
              <CreditCard className="w-4 h-4" />
              Thanh toán trực tuyến ngay
            </button>
          </div>

          {/* CỘT PHẢI: BẢNG TRA CỨU LỊCH SỬ HÓA ĐƠN ĐÃ ĐÓNG (2 PHẦN) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Lịch sử giao dịch</h3>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">Năm 2026</span>
            </div>

            {/* List hóa đơn cũ */}
            <div className="divide-y divide-slate-100">
              {historyInvoices.map((invoice) => (
                <div key={invoice.id} className="py-3.5 flex items-center justify-between gap-2 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{invoice.period}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" /> Ngày thanh toán: {invoice.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{invoice.amount} đ</span>
                      <span className="text-[9px] text-slate-400 font-medium">Mã đơn: {invoice.id}</span>
                    </div>
                    <button title="Tải hóa đơn" className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}