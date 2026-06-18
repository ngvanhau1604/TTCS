import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Users, BarChart3, MessageSquare, Calculator,
  CheckCircle, Clock, CornerUpRight, ShieldAlert
} from 'lucide-react';
import { apiFetch } from '../utils/api';

export default function AdminDisputes() {
  const navigate = useNavigate();

  // Dữ liệu khiếu nại thật từ backend
  const [disputes, setDisputes] = useState([]);

  const loadDisputes = async () => {
    try {
      const pendingList = await apiFetch('/api/service-requests?status=PENDING');
      const processingList = await apiFetch('/api/service-requests?status=PROCESSING');
      const resolvedList = await apiFetch('/api/service-requests?status=RESOLVED');
      const rejectedList = await apiFetch('/api/service-requests?status=REJECTED');
      
      // Gộp chung tất cả các danh sách
      setDisputes([...pendingList, ...processingList, ...resolvedList, ...rejectedList]);
    } catch (err) {
      console.error("Lỗi tải khiếu nại:", err);
    }
  };

  useEffect(() => {
    loadDisputes();
  }, []);

  // Ánh xạ dữ liệu sang giao diện hiển thị
  const formattedDisputes = disputes.map(ticket => ({
    id: `DSP-${ticket.requestId}`,
    room: ticket.apartment?.roomNumber || 'N/A',
    title: ticket.title,
    desc: ticket.resolutionNote ? `${ticket.content}\n\n[BQL Phản hồi]: ${ticket.resolutionNote}` : ticket.content,
    status: ticket.status === 'RESOLVED' ? 'Resolved' : 
            ticket.status === 'REJECTED' ? 'Rejected' : 
            ticket.status === 'PROCESSING' ? 'Processing' : 'Pending',
    date: ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('vi-VN') : 'N/A',
    rawId: ticket.requestId
  }));

  // Hành động Bác bỏ đơn gửi về backend
  const handleReject = async (id, rawId) => {
    if (!window.confirm(`Xác nhận bác bỏ khiếu nại ${id}?`)) return;
    try {
      await apiFetch(`/api/service-requests/${rawId}/review`, {
        method: 'PUT',
        body: JSON.stringify({
          status: 'REJECTED',
          note: 'Ban quản lý từ chối xử lý yêu cầu/khiếu nại này.'
        })
      });
      alert(`Đã bác bỏ đơn khiếu nại ${id}.`);
      loadDisputes();
    } catch (err) {
      alert("Lỗi khi bác bỏ đơn: " + err.message);
    }
  };

  // Phản hồi và duyệt thành công hoàn thành
  const handleReplyAndResolve = async (id, rawId, room) => {
    const replyMessage = prompt(`Nhập nội dung ban quản lý phản hồi gửi tới căn hộ ${room}:`);
    
    if (replyMessage && replyMessage.trim() !== '') {
      try {
        await apiFetch(`/api/service-requests/${rawId}/review`, {
          method: 'PUT',
          body: JSON.stringify({
            status: 'RESOLVED',
            note: replyMessage
          })
        });
        alert(`Đã gửi phản hồi! Đơn khiếu nại ${id} của căn hộ ${room} đã được cập nhật sang trạng thái: ĐÃ GIẢI QUYẾT.`);
        loadDisputes();
      } catch (err) {
        alert("Lỗi khi phản hồi: " + err.message);
      }
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
            {disputes.filter(d => d.status === 'PENDING').length > 0 && (
              <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {disputes.filter(d => d.status === 'PENDING').length}
              </span>
            )}
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
            {formattedDisputes.map((ticket) => (
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
                      onClick={() => handleReject(ticket.id, ticket.rawId)}
                      className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
                    >
                      Bác bỏ
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleReplyAndResolve(ticket.id, ticket.rawId, ticket.room)}
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