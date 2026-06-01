import React, { useState } from 'react';
import { 
  CreditCard, Wallet, QrCode, ArrowLeft, Download, 
  Droplet, Zap, Car, ShieldAlert, CheckCircle2, Info, Building
} from 'lucide-react';

export default function ResidentPayment() {
  // Trạng thái hóa đơn giả lập của Căn hộ P102 - Tháng 05/2026
  const [invoiceStatus, setInvoiceStatus] = useState('unpaid'); // 'unpaid' hoặc 'processing' hoặc 'paid'
  const [selectedMethod, setSelectedMethod] = useState('qr'); // 'qr', 'vnpay', 'momo'
  const [isLoading, setIsLoading] = useState(false);

  // Chi tiết các khoản phí bắt buộc
  const feeDetails = [
    { id: 1, name: "Phí dịch vụ quản lý tòa nhà", desc: "Diện tích: 75m² x 10,000đ/m²", amount: 750000, icon: Building, color: "text-blue-600 bg-blue-50" },
    { id: 2, name: "Phí trông giữ xe tháng 5", desc: "1 Ô tô (500k) + 2 Xe máy (200k)", amount: 700000, icon: Car, color: "text-indigo-600 bg-indigo-50" },
    { id: 3, name: "Tiền điện tiêu thụ", desc: "Chỉ số: 1250 - 1510 (260 kWh)", amount: 685000, icon: Zap, color: "text-amber-600 bg-amber-50", alert: true },
    { id: 4, name: "Tiền nước sinh hoạt", desc: "Chỉ số: 340 - 355 (15 m³)", amount: 165000, icon: Droplet, color: "text-cyan-600 bg-cyan-50" },
  ];

  // Tính tổng tiền cần nộp
  const totalAmount = feeDetails.reduce((sum, item) => sum + item.amount, 0);

  // Hàm xử lý kích hoạt cổng thanh toán
  const handlePaymentSubmit = () => {
    setIsLoading(true);
    // Giả lập cổng thanh toán xử lý chuyển hướng hoặc gọi API IPN
    setTimeout(() => {
      setIsLoading(false);
      setInvoiceStatus('paid');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 antialiased font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Thanh điều hướng quay lại */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mã hóa đơn: #INV-2026-05102</span>
        </div>

        {/* 1. KHỐI TRẠNG THÁI TỔNG DƯ NỢ CỦA CĂN HỘ */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${
          invoiceStatus === 'paid' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-rose-50 border-rose-200 text-rose-900'
        } flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-black tracking-wider opacity-70">Hóa đơn căn hộ P102</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                invoiceStatus === 'paid' ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
              }`}>
                {invoiceStatus === 'paid' ? 'Đã hoàn tất' : 'Chưa thanh toán'}
              </span>
            </div>
            <p className="text-3xl font-black">{totalAmount.toLocaleString('vi-VN')} đ</p>
            <p className="text-xs opacity-80 font-medium">Hạn chót thanh toán: Trước 23:59 ngày 10/06/2026</p>
          </div>

          {invoiceStatus === 'paid' ? (
            <button className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>Tải biên lai điện tử (PDF)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold bg-white/60 border border-rose-200/50 p-3 rounded-xl max-w-xs">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Vui lòng thanh toán đúng hạn để tránh phát sinh phí phạt chậm nộp 0.05%/ngày.</span>
            </div>
          )}
        </div>

        {/* BỐ CỤC CHIA 2 CỘT: CHI TIẾT PHÍ & PHƯƠNG THỨC THANH TOÁN */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* CỘT TRÁI: DANH SÁCH CÁC KHOẢN PHÍ CHI TIẾT (3 PHẦN) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Chi tiết dịch vụ tiêu dùng</h3>
              <p className="text-xs text-slate-400">Bao gồm các chi phí vận hành cố định và biến đổi tháng này.</p>
            </div>

            <div className="divide-y divide-slate-100">
              {feeDetails.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="py-4 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          {item.name}
                          {item.alert && (
                            <span className="group relative cursor-pointer">
                              <Info className="w-3.5 h-3.5 text-amber-500" />
                              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                Lượng điện tăng 22% so với tháng trước!
                              </span>
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-900">
                      {item.amount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl">
              <span className="text-sm font-bold text-slate-700">Cộng thành tiền</span>
              <span className="text-lg font-black text-blue-600">{totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI CHỌN CỔNG & TIẾN HÀNH THANH TOÁN (2 PHẦN) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Form chọn phương thức thanh toán */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex-1">
              <div>
                <h3 className="text-base font-bold text-slate-900">Cổng thanh toán trực tuyến</h3>
                <p className="text-xs text-slate-400">Chọn giải pháp thanh toán bảo mật an toàn.</p>
              </div>

              {invoiceStatus === 'paid' ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-200">
                  <div className="p-3 bg-emerald-500 text-white rounded-full shadow-md shadow-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Giao dịch thành công</h4>
                    <p className="text-xs text-emerald-600 max-w-[200px] mt-1">Hệ thống đã nhận đủ tiền và cập nhật gạch nợ tự động.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Option 1: QR Code chuyển khoản nhanh */}
                  <label 
                    className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === 'qr' 
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedMethod('qr')}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-slate-700" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">VietQR - Chuyển khoản nhanh</p>
                        <p className="text-[10px] text-slate-400">Quét mã QR tự điền số tiền & nội dung</p>
                      </div>
                    </div>
                    <input type="radio" checked={selectedMethod === 'qr'} readOnly className="text-blue-600 focus:ring-0" />
                  </label>

                  {/* Option 2: Cổng VNPAY */}
                  <label 
                    className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === 'vnpay' 
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedMethod('vnpay')}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-slate-700" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">Cổng VNPAY / Thẻ ATM Nội Địa</p>
                        <p className="text-[10px] text-slate-400">Hỗ trợ tất cả ngân hàng Việt Nam</p>
                      </div>
                    </div>
                    <input type="radio" checked={selectedMethod === 'vnpay'} readOnly className="text-blue-600 focus:ring-0" />
                  </label>

                  {/* Option 3: Ví MoMo */}
                  <label 
                    className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === 'momo' 
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedMethod('momo')}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-slate-700" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">Ví Điện Tử MoMo</p>
                        <p className="text-[10px] text-slate-400">Thanh toán một chạm qua app MoMo</p>
                      </div>
                    </div>
                    <input type="radio" checked={selectedMethod === 'momo'} readOnly className="text-blue-600 focus:ring-0" />
                  </label>

                  {/* Button kích hoạt quy trình nộp tiền */}
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      `Xác nhận thanh toán ${(totalAmount).toLocaleString('vi-VN')}đ`
                    )}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}