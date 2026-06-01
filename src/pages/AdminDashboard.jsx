import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Building2, LayoutDashboard, Users, BarChart3, 
  Bell, Search, DollarSign, CheckCircle, AlertTriangle, MessageSquare,
  ArrowUpRight, TrendingUp, Filter, ChevronRight, Calculator, X,
  LogOut // <-- Thêm icon LogOut ở đây
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State quản lý danh sách thông báo (để đẩy lên giao diện real-time)
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Thông báo chốt số điện nước T5", content: "Yêu cầu cư dân kiểm tra đối chiếu chỉ số công tơ..." },
    { id: 2, title: "Lịch bảo trì thang máy tòa A", content: "Tạm dừng hoạt động thang số 03 từ 14h - 16h ngày..." }
  ]);

  // State quản lý Modal Tạo thông báo
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  // Giả lập danh sách hóa đơn
  const [recentInvoices] = useState([
    { id: "HD-2026-001", room: "P102", type: "Phí dịch vụ + Điện nước", amount: "2,450,000", status: "Paid", date: "31/05/2026" },
    { id: "HD-2026-002", room: "P504", type: "Phí quản lý tháng 5", amount: "1,200,000", status: "Unpaid", date: "30/05/2026" },
    { id: "HD-2026-003", room: "P312", type: "Phí gửi xe máy/ô tô", amount: "850,000", status: "Pending", date: "29/05/2026" },
    { id: "HD-2026-004", room: "P701", type: "Phí dịch vụ tổng hợp", amount: "3,110,000", status: "Paid", date: "28/05/2026" },
    { id: "HD-2026-005", room: "P208", type: "Phí điện nước tiêu thụ", amount: "1,680,000", status: "Unpaid", date: "28/05/2026" }
  ]);

  const chartData = [
    { month: 'T1', value: 65 }, { month: 'T2', value: 78 }, { month: 'T3', value: 85 }, { month: 'T4', value: 92 }, { month: 'T5', value: 74 }
  ];

  const filteredInvoices = recentInvoices.filter(invoice => 
    invoice.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý tạo thông báo mới đẩy lên bảng liền
  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.content.trim()) return;

    const noticeObj = {
      id: Date.now(),
      title: newNotice.title,
      content: newNotice.content
    };

    setAnnouncements([noticeObj, ...announcements]); // Đẩy lên đầu danh sách hiển thị
    setNewNotice({ title: '', content: '' });
    setIsNoticeModalOpen(false);
  };

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    // Nếu có localStorage/sessionToken thì xóa ở đây, ví dụ: localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased font-sans relative">
      
      {/* SIDEBAR CỐ ĐỊNH */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-md">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-wider uppercase">SmartFee BQL</span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>Bảng điều khiển</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/residents')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Users className="w-5 h-5" />
            <span>Quản lý cư dân</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/fee-calculation')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Calculator className="w-5 h-5" />
            <span>Tính phí căn hộ</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/analytics')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <BarChart3 className="w-5 h-5" />
            <span>Thống kê tài chính</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/disputes')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all flex justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span>Xử lý tranh chấp</span>
            </div>
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">3</span>
          </button>
        </nav>

        {/* PHẦN FOOTER SIDEBAR ĐÃ THÊM NÚT LOGOUT */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">AD</div>
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate">Nhân Nguyễn</p>
              <p className="text-xs text-slate-500 truncate">Trưởng ban quản lý</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleLogout}
            title="Đăng xuất tài khoản"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-all shrink-0"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* WORKSPACE CHÍNH */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-bold text-slate-900 hidden md:block">Tổng quan vận hành</h1>
            <div className="relative w-full max-w-xs md:max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Tìm mã căn hộ, loại phí..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => alert("Hệ thống vận hành ổn định.")} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white">
              <Filter className="w-4 h-4 text-slate-500" />
              <span>Tháng 05/2026</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Thẻ chỉ số */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doanh thu thu về</span>
                <p className="text-2xl font-black text-slate-900">428.5M đ</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg w-max">
                  <TrendingUp className="w-3.5 h-3.5" /> <span>+12.4% so với T4</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến độ thu phí</span>
                <p className="text-2xl font-black text-slate-900">84.2 %</p>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Căn hộ chưa nộp</span>
                <p className="text-2xl font-black text-slate-900">32 / 240</p>
                <span className="text-xs text-slate-400 font-medium block">Cần gửi thông báo nhắc phí</span>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tranh chấp cần xử lý</span>
                <p className="text-2xl font-black text-slate-900">03 vụ</p>
                <span onClick={() => navigate('/admin/disputes')} className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-all underline cursor-pointer flex items-center gap-0.5">
                  Xem chi tiết <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><MessageSquare className="w-6 h-6" /></div>
            </div>
          </section>

          {/* Biểu đồ & Cột thông báo REAL-TIME */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Thống kê tỷ lệ hoàn thành thu phí dịch vụ</h3>
              <div className="h-48 flex items-end justify-between pt-6 px-4 border-b border-slate-100">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-12 bg-slate-100 rounded-t-lg relative flex items-end h-full">
                      <div className="bg-blue-600 w-full rounded-t-lg relative" style={{ height: `${data.value}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BẢNG THÔNG BÁO HIỂN THỊ NGAY LẬP TỨC KHI TẠO */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">Thông báo từ BQL tòa nhà</h3>
                <p className="text-xs text-slate-400">Đã cập nhật lên app cho cư dân theo dõi.</p>
              </div>
              
              <div className="space-y-3 flex-1 my-3 overflow-y-auto max-h-[180px] pr-1">
                {announcements.map((item) => (
                  <div key={item.id} className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1 animate-fadeIn">
                    <span className="font-bold text-blue-700 block">{item.title}</span>
                    <p className="text-slate-600 line-clamp-2">{item.content}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsNoticeModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Tạo thông báo mới</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* BẢNG DANH SÁCH HÓA ĐƠN */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Các hóa đơn phát sinh gần nhất</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-5">Mã hóa đơn</th>
                    <th className="py-3 px-5">Căn hộ</th>
                    <th className="py-3 px-5">Loại phí dịch vụ</th>
                    <th className="py-3 px-5 text-right">Số tiền (đ)</th>
                    <th className="py-3 px-5 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-mono text-xs text-slate-500">{invoice.id}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-900">{invoice.room}</td>
                      <td className="py-3.5 px-5 text-slate-600 text-xs">{invoice.type}</td>
                      <td className="py-3.5 px-5 text-right font-black text-slate-900">{invoice.amount}</td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${
                          invoice.status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                        }`}>{invoice.status === 'Paid' ? 'Đã nộp' : 'Chưa nộp'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* FORM MODAL TẠO THÔNG BÁO MỚI (ĐẨY LÊN BẢNG LIỀN) */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-xl animate-scaleIn overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Tạo thông báo gửi cư dân</h3>
              <button onClick={() => setIsNoticeModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateNotice} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Tiêu đề thông báo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Lịch phun thuốc muỗi định kỳ"
                  value={newNotice.title} 
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Nội dung chi tiết *</label>
                <textarea 
                  rows="4" 
                  required
                  placeholder="Nhập lịch trình chi tiết hoặc lưu ý cho cư dân..."
                  value={newNotice.content} 
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all">
                Phát hành &amp; Đẩy lên bảng tin
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}