import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, Wallet, QrCode, ArrowLeft, Download, 
  Droplet, Zap, Car, ShieldAlert, CheckCircle2, Info, Building, Check
} from 'lucide-react';
import { apiFetch } from '../utils/api';

export default function ResidentPayment() {
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [invoiceStatus, setInvoiceStatus] = useState('unpaid'); // 'unpaid' | 'processing' | 'paid'
  const [selectedMethod, setSelectedMethod] = useState('vnpay'); // 'qr' | 'vnpay' | 'momo'
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- TẢI HÓA ĐƠN CHƯA THANH TOÁN ---
  const loadInvoiceData = async () => {
    try {
      setLoading(true);
      // 1. Lấy thông tin tài khoản
      const user = await apiFetch('/api/auth/me');
      
      // 2. Tìm căn hộ của tài khoản này bằng apartmentCode trong profile của user
      const apartments = await apiFetch('/api/apartments');
      const myApartment = apartments.find(ap => ap.roomNumber.trim().toUpperCase() === user.apartmentCode?.trim().toUpperCase());
      
      if (myApartment) {
        // 3. Tải hóa đơn của căn hộ
        const invoices = await apiFetch(`/api/invoices?apartmentId=${myApartment.apartmentId}`);
        const unpaid = invoices.find(inv => inv.status === 'PENDING' || inv.status === 'UNPAID' || inv.status === 'OVERDUE');
        if (unpaid) {
          setInvoice(unpaid);
          if (unpaid.status === 'PAID') {
            setInvoiceStatus('paid');
          } else {
            setInvoiceStatus('unpaid');
          }
        } else {
          setInvoice(null);
        }
      } else {
        setInvoice(null);
      }
    } catch (err) {
      console.error("Lỗi tải thông tin hóa đơn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoiceData();
  }, []);

  const feeDetails = invoice ? [
    { id: 1, name: "Phí dịch vụ quản lý tòa nhà", desc: `Diện tích căn hộ: ${invoice.apartment?.area || 0}m²`, amount: Number(invoice.managementFee || 0), icon: Building, color: "text-blue-600 bg-blue-50" },
    { id: 2, name: "Phí trông giữ xe", desc: `Xe máy: ${invoice.apartment?.motorbikeSlots || 0}, Ô tô: ${invoice.apartment?.carSlots || 0}`, amount: Number(invoice.parkingFee || 0), icon: Car, color: "text-indigo-600 bg-indigo-50" },
    { id: 3, name: "Tiền điện tiêu thụ", desc: "Theo số công tơ ghi nhận điện", amount: Number(invoice.electricFee || 0), icon: Zap, color: "text-amber-600 bg-amber-50" },
    { id: 4, name: "Nước sinh hoạt", desc: "Theo số mét khối nước tiêu thụ", amount: Number(invoice.waterFee || 0), icon: Droplet, color: "text-cyan-600 bg-cyan-50" },
  ] : [];

  const totalAmount = invoice ? Number(invoice.totalAmount || 0) : 0;

  // --- XỬ LÝ TẢI HÓA ĐƠN ĐIỆN TỬ ---
  const handleDownloadInvoice = () => {
    if (!invoice) return;
    alert(`Đang tải biên lai chi tiết PDF của hóa đơn HĐ-${invoice.invoiceId} về thiết bị...`);
  };

  // --- XỬ LÝ THANH TOÁN ---
  const handlePaymentSubmit = async () => {
    if (!invoice) return;
    setIsLoading(true);
    try {
      // 1. Khởi tạo thanh toán trên backend
      await apiFetch('/api/payments', {
        method: 'POST',
        body: JSON.stringify({
          invoiceId: String(invoice.invoiceId),
          method: selectedMethod.toUpperCase()
        })
      });

      // 2. Chuyển trạng thái sang chờ duyệt/đối soát
      setInvoiceStatus('processing');
    } catch (err) {
      alert("Lỗi khởi tạo thanh toán: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- GIẢ LẬP WEBHOOK THANH TOÁN THÀNH CÔNG ---
  const handleMockPaySuccess = async () => {
    if (!invoice) return;
    setIsLoading(true);
    try {
      // Cư dân tự thanh toán (Đã cập nhật SecurityConfig cho phép RESIDENT gọi mark-paid)
      await apiFetch(`/api/invoices/${invoice.invoiceId}/mark-paid`, {
        method: 'POST'
      });
      setInvoiceStatus('paid');
      alert("Simulated: Thanh toán hóa đơn thành công!");
    } catch (err) {
      alert("Lỗi khi giả lập thanh toán: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold text-xs uppercase tracking-wider">Đang tải cổng thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* THANH ĐIỀU HƯỚNG QUAY LẠI */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => navigate('/resident/dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang tổng quan
          </button>
          <span className="text-xs text-slate-400 font-medium">
            {invoice ? `Mã hóa đơn: HĐ-${invoice.invoiceId}` : 'Không có hóa đơn'}
          </span>
        </div>

        {/* TIÊU ĐỀ CHÍNH */}
        <div className="space-y-1">
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Chi tiết cổng đóng phí</h1>
          <p className="text-xs text-slate-500 font-medium">Đối chiếu các khoản dịch vụ định kỳ và tiến hành hoàn tất hóa đơn tháng này.</p>
        </div>

        {/* BỐ CỤC CHÍNH CHIA LÀM 2 CỘT */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* CỘT PHẢI: CHI TIẾT CÁC KHOẢN PHÍ TRONG HÓA ĐƠN (3 PHẦN ĐẤT) */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Hóa Đơn Tổng Hợp</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {invoice ? `Kỳ thanh toán: Tháng ${new Date(invoice.billingMonth).getMonth() + 1}/${new Date(invoice.billingMonth).getFullYear()}` : 'Chưa có hóa đơn từ BQL'}
                </p>
              </div>
              
              <button 
                type="button"
                onClick={handleDownloadInvoice}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-bold rounded-xl transition-all shadow-sm ${invoice ? 'bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}
                title={invoice ? 'Tải hóa đơn PDF về máy' : 'Chờ BQL tạo hóa đơn'}
                disabled={!invoice}
              >
                <Download className="w-3.5 h-3.5" /> Biên lai
              </button>
            </div>

            <div className="divide-y divide-slate-100 p-5 pt-2">
              {invoice ? (
                feeDetails.map((fee) => {
                  const IconComponent = fee.icon;
                  return (
                    <div key={fee.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${fee.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{fee.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{fee.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900 tracking-tight shrink-0">
                        {fee.amount.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-slate-500">
                  <p className="text-sm font-bold text-slate-800">Hiện chưa có phí</p>
                  <p className="text-xs mt-2">Ban quản lý chưa chốt phí cho tháng này. Vui lòng quay lại sau khi BQL đã tính phí hoặc thông báo lịch tự động.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng cộng cần thanh toán</span>
              <span className="text-lg font-black tracking-tight">{totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          {/* CỘT PHẢI: PHƯƠNG THỨC THANH TOÁN VÀ XỬ LÝ LỆNH (2 PHẦN ĐẤT) */}
          <div className="md:col-span-2 space-y-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Phương thức nộp tiền</h3>
              
              {!invoice ? (
                <div className="py-10 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Info className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">Không có hóa đơn nợ</p>
                  <p className="text-[11px] text-slate-500 px-4">Bạn không có hóa đơn nào chưa đóng. Vui lòng kiểm tra lại sau khi BQL gửi thông báo mới.</p>
                </div>
              ) : invoiceStatus === 'paid' ? (
                /* Giao diện khi đã đóng tiền xong */
                <div className="py-6 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 uppercase">Đã hoàn tất thanh toán</h4>
                    <p className="text-[10px] text-slate-400 font-medium px-4">Hệ thống đã nhận đủ số tiền và gạch nợ trên hệ thống quản lý tòa nhà.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => navigate('/resident/dashboard')}
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all"
                  >
                    Về Trang Chủ Cư Dân
                  </button>
                </div>
              ) : invoiceStatus === 'processing' ? (
                /* Giao diện chờ Ban quản lý đối soát lệnh duyệt tiền */
                <div className="py-6 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Info className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 uppercase">Đang chờ BQL đối soát tiền</h4>
                    <p className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100 py-1.5 px-2 rounded-xl mx-2">
                      Lệnh chuyển khoản đã được ghi nhận!
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium px-2 pt-1 leading-relaxed">
                      Để hoàn tất giao dịch tự động nhanh chóng cho môi trường thử nghiệm, bạn hãy click nút bên dưới để xác nhận đóng tiền thành công.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleMockPaySuccess}
                    className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Xác nhận đã chuyển khoản
                  </button>
                </div>
              ) : (
                /* Form lựa chọn kênh thanh toán và xác nhận */
                <div className="space-y-3">
                  
                  {/* QUÉT QR CHUYỂN KHOẢN */}
                  <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedMethod === 'qr' ? 'border-blue-500 bg-blue-50/40 shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-slate-700" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Quét mã QR Code</p>
                        <p className="text-[10px] text-slate-400 font-medium">VietQR chuyển khoản nhanh 247</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={selectedMethod === 'qr'} 
                      onChange={() => setSelectedMethod('qr')}
                      className="text-blue-600 focus:ring-0" 
                    />
                  </label>

                  {/* CỔNG VNPAY */}
                  <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedMethod === 'vnpay' ? 'border-blue-500 bg-blue-50/40 shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-slate-700" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Cổng Thẻ VNPAY</p>
                        <p className="text-[10px] text-slate-400 font-medium">Thẻ ATM / Mobile Banking</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={selectedMethod === 'vnpay'} 
                      onChange={() => setSelectedMethod('vnpay')}
                      className="text-blue-600 focus:ring-0" 
                    />
                  </label>

                  {/* VÍ MOMO */}
                  <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedMethod === 'momo' ? 'border-blue-500 bg-blue-50/40 shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-slate-700" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Ví Điện Tử MoMo</p>
                        <p className="text-[10px] text-slate-400 font-medium">Chuyển tiền nhanh qua app MoMo</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={selectedMethod === 'momo'} 
                      onChange={() => setSelectedMethod('momo')}
                      className="text-blue-600 focus:ring-0" 
                    />
                  </label>

                  {/* NÚT THỰC THI CHUYỂN TIỀN */}
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      `Xác nhận đóng phí ${totalAmount.toLocaleString('vi-VN')} đ`
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* THÔNG BÁO BẢO MẬT AN TOÀN */}
            <div className="p-3.5 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 text-[10px] flex items-start gap-2.5 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>Mọi giao dịch đóng phí trực tuyến trên hệ thống SmartFee đều được mã hóa SSL/TLS bảo mật nghiêm ngặt và đối soát tự động trực tiếp về tài khoản ngân hàng của Ban quản lý tòa nhà.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
