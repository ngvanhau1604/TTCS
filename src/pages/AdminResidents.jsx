import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Users, BarChart3, MessageSquare, Calculator,
  Search, Plus, Filter, UserCheck, ShieldAlert, Mail, Phone, Home, X
} from 'lucide-react';
import { apiFetch, session } from '../utils/api';

export default function AdminResidents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Dữ liệu từ backend
  const [apartments, setApartments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [disputesCount, setDisputesCount] = useState(0);

  // Hàm load dữ liệu
  const loadData = async () => {
    try {
      const aptList = await apiFetch('/api/apartments');
      setApartments(aptList);

      const invList = await apiFetch('/api/invoices');
      setInvoices(invList);

      const pendingList = await apiFetch('/api/admin/registrations/pending');
      setPendingRegistrations(pendingList);

      const disputes = await apiFetch('/api/service-requests?status=PENDING');
      setDisputesCount(disputes.length);
    } catch (err) {
      console.error("Lỗi tải thông tin cư dân:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xử lý Duyệt / Từ chối đăng ký cư dân
  const handleApprove = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn duyệt cư dân này?")) return;
    try {
      await apiFetch(`/api/admin/registrations/${userId}/approve`, { method: 'POST' });
      alert("Đã duyệt đăng ký thành công!");
      loadData();
    } catch (err) {
      alert("Duyệt thất bại: " + err.message);
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn từ chối đăng ký này?")) return;
    try {
      await apiFetch(`/api/admin/registrations/${userId}/reject`, { method: 'POST' });
      alert("Đã từ chối đăng ký thành công!");
      loadData();
    } catch (err) {
      alert("Từ chối thất bại: " + err.message);
    }
  };

  const residents = apartments
    .filter(apt => apt.owner !== null)
    .map(apt => {
      const aptInvoices = invoices.filter(inv => inv.apartment?.apartmentId === apt.apartmentId);
      const hasUnpaid = aptInvoices.some(inv => inv.status === 'PENDING' || inv.status === 'OVERDUE');
      return {
        id: `RES-${apt.apartmentId}`,
        name: apt.owner.fullName || apt.owner.username,
        room: apt.roomNumber,
        phone: apt.owner.phoneNumber || 'N/A',
        email: apt.owner.email || 'N/A',
        status: hasUnpaid ? 'Unpaid' : 'Paid',
        members: 1 // Default nhân khẩu là 1 cho chủ hộ
      };
    });

  // Trạng thái mở Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // State tạm lưu dữ liệu form nhập
  const [residentForm, setResidentForm] = useState({
    name: '', room: '', phone: '', email: '', status: 'Unpaid', members: 1
  });

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mở form điền mới hộ dân
  const openAddModal = () => {
    setIsEditMode(false);
    setResidentForm({ name: '', room: '', phone: '', email: '', status: 'Unpaid', members: 1 });
    setIsFormOpen(true);
  };

  // Mở form chỉnh sửa dữ liệu hộ dân
  const openEditModal = (resident) => {
    setIsEditMode(true);
    setCurrentId(resident.id);
    setResidentForm({
      name: resident.name,
      room: resident.room,
      phone: resident.phone,
      email: resident.email,
      status: resident.status,
      members: resident.members
    });
    setIsFormOpen(true);
  };

  // Submit Form (Xử lý gộp cả Thêm & Sửa real-time)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!residentForm.name || !residentForm.room) return;

    if (isEditMode) {
      try {
        const aptId = Number(currentId.replace('RES-', ''));
        const apt = apartments.find(a => a.apartmentId === aptId);
        if (!apt || !apt.owner) {
          alert("Không tìm thấy thông tin cư dân để cập nhật.");
          return;
        }

        await apiFetch(`/api/admin/registrations/users/${apt.owner.userId}`, {
          method: 'PUT',
          body: JSON.stringify({
            fullName: residentForm.name,
            phoneNumber: residentForm.phone,
            apartmentCode: residentForm.room
          })
        });
        alert("Cập nhật thông tin cư dân thành công!");
        loadData();
      } catch (err) {
        alert("Cập nhật thất bại: " + err.message);
      }
    } else {
      try {
        const username = residentForm.phone.replace(/[^0-9]/g, '') || `user${Date.now()}`;
        await apiFetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            username,
            password: 'password123',
            fullName: residentForm.name,
            phoneNumber: residentForm.phone,
            apartmentCode: residentForm.room
          })
        });

        // Tải danh sách đăng ký chờ duyệt, tìm và duyệt
        const pendingList = await apiFetch('/api/admin/registrations/pending');
        const newUser = pendingList.find(u => u.username === username);
        if (newUser) {
          await apiFetch(`/api/admin/registrations/${newUser.userId}/approve`, { method: 'POST' });
        }
        alert(`Thêm cư dân thành công!\nTài khoản đăng nhập: ${username}\nMật khẩu mặc định: password123`);
        loadData();
      } catch (err) {
        alert("Thêm cư dân thất bại: " + err.message);
      }
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased font-sans relative">
      
      {/* SIDEBAR - ĐÃ ĐƯỢC CHỈNH FIX LỖI */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-md"><Building2 className="w-5 h-5" /></div>
          <span className="text-lg font-bold uppercase tracking-wider">SmartFee BQL</span>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" /> <span>Bảng điều khiển</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/residents')} className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl transition-all">
            <Users className="w-5 h-5" /> <span>Quản lý cư dân</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/fee-calculation')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Calculator className="w-5 h-5" /> <span>Tính phí căn hộ</span>
          </button>
          <button type="button" onClick={() => navigate('/admin/analytics')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <BarChart3 className="w-5 h-5" /> <span>Thống kê tài chính</span>
          </button>
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
          <h1 className="text-xl font-bold text-slate-900">Sổ hộ tịch &amp; Danh sách cư dân</h1>
          <button onClick={openAddModal} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md">
            <Plus className="w-4 h-4" /> <span>Thêm hộ dân mới</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* PHẦN DUYỆT ĐĂNG KÝ CƯ DÂN PENDING (CHỈ HIỂN THỊ KHI CÓ DỮ LIỆU) */}
          {pendingRegistrations.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-amber-100 bg-amber-50/50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600 animate-pulse" />
                  Yêu cầu đăng ký cư dân cần phê duyệt ({pendingRegistrations.length})
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {pendingRegistrations.map((reg) => (
                  <div key={reg.userId} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{reg.fullName || reg.username}</p>
                      <p className="text-xs text-slate-500">Tài khoản: {reg.username} | SĐT: {reg.phoneNumber || 'N/A'}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-1">Đăng ký Căn hộ: P{reg.apartmentCode}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(reg.userId)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all">Duyệt</button>
                      <button onClick={() => handleReject(reg.userId)} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all">Từ chối</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Tìm kiếm cư dân..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* BẢNG HIỂN THỊ CƯ DÂN REAL-TIME */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-5">Chủ hộ &amp; Phòng</th>
                    <th className="py-3 px-5">Thông tin liên hệ</th>
                    <th className="py-3 px-5 text-center">Nhân khẩu</th>
                    <th className="py-3 px-5 text-center">Trạng thái phí</th>
                    <th className="py-3 px-5 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredResidents.map((resident) => (
                    <tr key={resident.id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-100 rounded-lg text-slate-700"><Home className="w-4 h-4" /></div>
                          <div>
                            <p className="font-bold text-slate-900">{resident.name}</p>
                            <p className="text-xs text-blue-600 font-semibold">Phòng: {resident.room}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-xs space-y-0.5">
                        <p className="text-slate-600 font-semibold">{resident.phone}</p>
                        <p className="text-slate-400">{resident.email}</p>
                      </td>
                      <td className="py-4 px-5 text-center font-bold text-slate-800">{resident.members} người</td>
                      <td className="py-4 px-5 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          resident.status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                        }`}>
                          {resident.status === 'Paid' ? 'Đã thanh toán' : 'Còn nợ phí'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <button onClick={() => openEditModal(resident)} className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all">
                          Sửa thông tin
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* FORM MODAL GỘP THÊM HỘ MỚI & SỬA THÔNG TIN CƯ DÂN */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-xl overflow-hidden animate-scaleIn">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                {isEditMode ? 'Cập nhật thông tin nhân khẩu' : 'Đăng ký hộ dân mới'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Họ và tên chủ hộ *</label>
                <input type="text" required value={residentForm.name} onChange={(e) => setResidentForm({...residentForm, name: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white" placeholder="Nguyễn Văn A" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Số Căn hộ / Phòng *</label>
                  <input type="text" required value={residentForm.room} onChange={(e) => setResidentForm({...residentForm, room: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white" placeholder="P102" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Số nhân khẩu</label>
                  <input type="number" min="1" value={residentForm.members} onChange={(e) => setResidentForm({...residentForm, members: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Số điện thoại *</label>
                <input type="text" required value={residentForm.phone} onChange={(e) => setResidentForm({...residentForm, phone: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white" placeholder="090xxxxxxx" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Địa chỉ Email</label>
                <input type="email" value={residentForm.email} onChange={(e) => setResidentForm({...residentForm, email: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white" placeholder="cu_dan@gmail.com" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Trạng thái đóng phí căn hộ</label>
                <select value={residentForm.status} onChange={(e) => setResidentForm({...residentForm, status: e.target.value})} className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:bg-white font-bold">
                  <option value="Unpaid">Còn nợ phí</option>
                  <option value="Paid">Đã thanh toán sạch</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all mt-2">
                {isEditMode ? 'Lưu thay đổi hồ sơ' : 'Khai báo lập hộ mới'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}