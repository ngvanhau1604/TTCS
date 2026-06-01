import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Users, BarChart3, MessageSquare, Calculator,
  CheckCircle, Clock, CornerUpRight, ShieldAlert
} from 'lucide-react';

export default function AdminDisputes() {
  const navigate = useNavigate();

  // State danh sách khiếu nại để cập nhật trạng thái real-time
  const [disputes, setDisputes] = useState([
    { id: "DSP-101", room: "P102", title: "Thắc mắc chỉ số điện tăng đột biến", desc: "Tháng trước nhà tôi dùng 200 số, tháng này vọt lên 260 số điện, cần kỹ thuật kiểm tra lại công tơ.", status: "Pending", date: "01/06/2026" },
    { id: "DSP-102", room: "P504", title: "Lỗi cổng thanh toán trừ tiền 2 lần", desc: "Tôi quét mã QR MoMo báo lỗi nhưng tài khoản ngân hàng vẫn bị trừ 1,200,000đ. Đã gửi ảnh biên lai.", status: "Processing", date: "31/05/2026" },
    { id: "DSP-103", room: "P312", title: "Yêu cầu hoàn trả phí xe máy hủy đăng ký", desc: "Đã báo hủy xe máy số biển 70-G1 từ đầu tháng nhưng hóa đơn tháng 5 vẫn tính tiền gửi xe 100k.", status: "Pending", date: "29/05/2026" }
  ]);

  // Hành động Bác bỏ đơn đơn giản
  const handleReject = (id) => {
    setDisputes(disputes.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
    alert(`Đã bác bỏ đơn khiếu nại ${id}.`);
  };

  // LOGIC CHÍNH: Phản hồi xong tự động chuyển đổi sang trạng thái HOÀN THÀNH (Resolved)
  const handleReplyAndResolve = (id, room) => {
    const replyMessage = prompt(`Nhập nội dung ban quản lý phản hồi gửi tới căn hộ ${room}:`);
    
    // Nếu có nhập dữ liệu (không ấn cancel) thì kích hoạt đổi trạng thái luôn
    if (replyMessage && replyMessage.trim() !== '') {
      setDisputes(disputes.map(item => 
        item.id === id 
          ? { ...item, status: 'Resolved', desc: `${item.desc}\n\n[BQL Phản hồi]: ${replyMessage}` } 
          : item
      ));
      alert(`Đã gửi phản hồi! Đơn khiếu nại ${id} của căn hộ ${room} đã được tự động cập nhật sang trạng thái: ĐÃ GIẢI QUYẾT.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-md">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-wider uppercase">SmartFee BQL</span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
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
          
          <button type="button" onClick={() => navigate('/admin/disputes')} className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl transition-all flex justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span>Xử lý tranh chấp</span>
            </div>
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">3</span>
          </button>
        </nav>
      </aside>

      {/* WORKSPACE CHÍNH */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-xl font-bold text-slate-900">Trung tâm xử lý khiếu nại &amp; Tranh chấp</h1>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
            Hệ thống xử lý real-time phản hồi cư dân
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-4">
            {disputes.map((ticket) => (
              <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">{ticket.id} • Gửi ngày {ticket.date}</span>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">Căn {ticket.room}</span>
                      {ticket.title}
                    </h3>
                  </div>

                  {/* NHÃN TRẠNG THÁI TỰ ĐỘNG CHUYỂN SANG ĐÃ GIẢI QUYẾT (RESOLVED) KHI BAN QUẢN LÝ PHẢN HỒI XONG */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                    ticket.status === 'Resolved' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                    ticket.status === 'Processing' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                    ticket.status === 'Rejected' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-rose-50 border-rose-100 text-rose-700'
                  }`}>
                    {ticket.status === 'Resolved' ? <CheckCircle className="w-3.5 h-3.5" /> : 
                     ticket.status === 'Processing' ? <Clock className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    {ticket.status === 'Resolved' ? 'Đã giải quyết' : ticket.status === 'Processing' ? 'Đang xử lý' : ticket.status === 'Rejected' ? 'Đã bác bỏ' : 'Chưa xử lý'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium whitespace-pre-line">
                  {ticket.desc}
                </p>

                {ticket.status !== 'Resolved' && ticket.status !== 'Rejected' && (
                  <div className="flex justify-end gap-2 pt-1 animate-fadeIn">
                    <button 
                      type="button" 
                      onClick={() => handleReject(ticket.id)}
                      className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
                    >
                      Bác bỏ
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleReplyAndResolve(ticket.id, ticket.room)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all"
                    >
                      <CornerUpRight className="w-3.5 h-3.5" />
                      <span>Phản hồi cư dân &amp; Hoàn thành đơn</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}