import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, History, CheckCircle2, Download, Calendar, User, Home, 
  LogOut, Phone, MessageSquare, ShieldAlert, Users, Plus, Trash2, Send, Mail
} from 'lucide-react';

export default function ResidentDashboard() {
  const navigate = useNavigate();

  // --- 1. STATE QUẢN LÝ THÔNG TIN CƯ DÂN & NHÂN KHẨU ---
  const [residentInfo, setResidentInfo] = useState({
    name: "Nguyễn Văn A",
    room: "P102",
    phone: "0901234567",
    email: "vana@gmail.com",
  });
  
  const [members, setMembers] = useState([
    { id: 1, name: "Nguyễn Văn B", relation: "Con trai" },
    { id: 2, name: "Trần Thị C", relation: "Vợ" }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  // --- 2. STATE QUẢN LÝ PHẢN ÁNH & Ý KIẾN ---
  const [disputes, setDisputes] = useState([
    { id: "DSP-001", title: "Hành lang tầng 1 bị đọng nước", date: "28/05/2026", status: "Resolved", desc: "Khu vực hành lang gần thang máy có hiện tượng thấm nước." },
    { id: "DSP-002", title: "Thắc mắc chỉ số điện tăng", date: "01/06/2026", status: "Pending", desc: "Tháng này gia đình đi vắng nhiều nhưng số điện tăng đột biến." }
  ]);
  const [newDisputeTitle, setNewDisputeTitle] = useState('');
  const [newDisputeDesc, setNewDisputeDesc] = useState('');

  // --- 3. DỮ LIỆU GIẢ LẬP LỊCH SỬ HÓA ĐƠN ---
  const historyInvoices = [
    { id: "INV-2026-04", period: "Tháng 04/2026", amount: "1,890,000", date: "05/04/2026", status: "success" },
    { id: "INV-2026-03", period: "Tháng 03/2026", amount: "2,150,000", date: "04/03/2026", status: "success" },
    { id: "INV-2026-02", period: "Tháng 02/2026", amount: "1,560,000", date: "06/02/2026", status: "success" },
  ];

  // --- XỬ LÝ CHỨC NĂNG NHÂN KHẨU & SĐT ---
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName || !newMemberRelation) return;
    setMembers([...members, { id: Date.now(), name: newMemberName, relation: newMemberRelation }]);
    setNewMemberName('');
    setNewMemberRelation('');
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // --- XỬ LÝ GỬI PHẢN ÁNH ---
  const handleSendDispute = (e) => {
    e.preventDefault();
    if (!newDisputeTitle || !newDisputeDesc) return;
    const newTicket = {
      id: `DSP-${Math.floor(100 + Math.random() * 900)}`,
      title: newDisputeTitle,
      desc: newDisputeDesc,
      date: "01/06/2026",
      status: "Pending"
    };
    setDisputes([newTicket, ...disputes]);
    setNewDisputeTitle('');
    setNewDisputeDesc('');
    alert("Gửi phản ánh thành công! Ban quản lý sẽ phản hồi sớm nhất.");
  };

  // --- TẢI HÓA ĐƠN ---
  const handleDownloadInvoice = (id, period) => {
    alert(`Đang khởi tạo cấu trúc và tải xuống hóa đơn điện tử dạng PDF cho ${period} (Mã lệnh: ${id})...`);
  };

  // --- ĐĂNG XUẤT ---
  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi tài khoản cư dân không?")) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* CARD PROFILE CƯ DÂN & NÚT LOGOUT */}
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">{residentInfo.name}</h1>
                <span className="px-2.5 py-0.5 bg-blue-600 text-white font-extrabold text-[10px] uppercase rounded-full tracking-wider flex items-center gap-1">
                  <Home className="w-3 h-3" /> Căn hộ {residentInfo.room}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">SĐT: {residentInfo.phone} | Email: {residentInfo.email}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </header>

        {/* GIAO DIỆN CHÍNH CHIA LÀM 2 CỘT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CỘT TRÁI: ĐÓNG PHÍ & LỊCH SỬ & LIÊN HỆ BQL */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* BOX TRẠNG THÁI THANH TOÁN HIỆN TẠI */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md border border-slate-900 space-y-5 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-white/5 transform rotate-12">
                <CreditCard className="w-40 h-40" />
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hóa đơn khả dụng</span>
                  <h3 className="text-sm font-black text-slate-200">Phí Tổng Hợp - Tháng 05/2026</h3>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase rounded-lg tracking-wider">
                  Chưa thanh toán
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Tổng tiền cần nộp</span>
                <span className="text-2xl font-black text-white tracking-tight">2,450,000 đ</span>
              </div>
              <div className="pt-2">
                <button 
                  type="button"
                  onClick={() => navigate('/resident/payment')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Thanh toán trực tuyến
                </button>
              </div>
            </div>

            {/* LỊCH SỬ THANH TOÁN VÀ TẢI HÓA ĐƠN */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <History className="w-5 h-5 text-slate-700" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Lịch sử thanh toán & Tải biên lai</h3>
              </div>
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
                          <Calendar className="w-3 h-3" /> Ngày đóng: {invoice.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{invoice.amount} đ</span>
                        <span className="text-[9px] text-slate-400 font-medium">Mã: {invoice.id}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleDownloadInvoice(invoice.id, invoice.period)}
                        title="Tải hóa đơn về máy" 
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100 flex items-center gap-1 text-[11px] font-bold"
                      >
                        <Download className="w-3.5 h-3.5" /> Tải về
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHẦN PHẢN ÁNH & Ý KIẾN CƯ DÂN */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MessageSquare className="w-5 h-5 text-slate-700" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Hòm thư Phản ánh & Kiến nghị</h3>
              </div>

              {/* Form gửi phản ánh */}
              <form onSubmit={handleSendDispute} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Gửi phản ánh mới</p>
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Tiêu đề phản ánh (Ví dụ: Đèn hành lang hỏng...)"
                    value={newDisputeTitle}
                    onChange={(e) => setNewDisputeTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <textarea 
                    rows="3"
                    placeholder="Nội dung chi tiết kiến nghị gửi Ban quản lý..."
                    value={newDisputeDesc}
                    onChange={(e) => setNewDisputeDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs resize-none focus:outline-none focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3 h-3" /> Gửi phản ánh
                </button>
              </form>

              {/* Danh sách lịch sử phản ánh */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lịch sử kiến nghị của bạn</p>
                <div className="space-y-3">
                  {disputes.map((ticket) => (
                    <div key={ticket.id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">{ticket.title}</span>
                        <span className={`px-2 py-0.5 font-bold text-[9px] uppercase rounded-full tracking-wider border ${
                          ticket.status === 'Resolved' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'
                        }`}>
                          {ticket.status === 'Resolved' ? 'Đã giải quyết' : 'Đang chờ xử lý'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium leading-relaxed">{ticket.desc}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Mã đơn: {ticket.id} | Ngày gửi: {ticket.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: CẬP NHẬT THÔNG TIN / THÊM NHÂN KHẨU & LIÊN HỆ */}
          <div className="space-y-6">
            
            {/* BOX CẬP NHẬT SĐT & THÊM NHÂN KHẨU */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Users className="w-5 h-5 text-slate-700" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Cập nhật nhân khẩu & SĐT</h3>
              </div>

              {/* Form thay đổi Số điện thoại */}
              <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">Số điện thoại liên hệ chính</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    disabled={!isUpdatingInfo}
                    value={residentInfo.phone}
                    onChange={(e) => setResidentInfo({...residentInfo, phone: e.target.value})}
                    className={`px-3 py-1.5 border text-xs font-bold rounded-xl grow ${isUpdatingInfo ? 'bg-white border-blue-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsUpdatingInfo(!isUpdatingInfo)}
                    className={`px-3 py-1.5 font-bold text-xs rounded-xl border transition-all ${
                      isUpdatingInfo ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isUpdatingInfo ? 'Lưu' : 'Sửa'}
                  </button>
                </div>
              </div>

              {/* Danh sách nhân khẩu hiện tại */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thành viên căn hộ ({members.length})</p>
                <div className="space-y-2">
                  {members.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold">
                      <div>
                        <p className="text-slate-800">{member.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Quan hệ: {member.relation}</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        title="Xóa nhân khẩu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form thêm nhân khẩu mới */}
              <form onSubmit={handleAddMember} className="space-y-2.5 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đăng ký thêm nhân khẩu</p>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Họ và tên..."
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Quan hệ (Vợ, con...)"
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm thành viên
                </button>
              </form>
            </div>

            {/* BOX LIÊN HỆ BAN QUẢN LÝ TÒA NHÀ */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Phone className="w-5 h-5 text-slate-700" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Liên hệ Ban Quản Lý</h3>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Mọi sự cố khẩn cấp về kỹ thuật, an ninh tòa nhà hoặc lỗi đối chiếu đóng phí vui lòng liên hệ hotline liên lạc trực tiếp:</p>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-3 p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 font-bold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-rose-500">Hotline Khẩn Cấp 24/7</p>
                    <p className="text-sm tracking-wide">0866.992.399</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 font-bold">
                  <Phone className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-blue-500">Phòng CSKH & Zalo BQL</p>
                    <p className="text-sm tracking-wide">0349.332.850</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold">
                  <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">Hòm thư điện tử hỗ trợ</p>
                    <p className="text-[11px]">bql.smartfee@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}