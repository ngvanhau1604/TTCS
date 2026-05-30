import { FormEvent, useEffect, useMemo, useState } from 'react';

type UserSession = {
  token: string;
  role: string;
  userId: number;
  username: string;
};

type AuthMode = 'login' | 'register';

type ResidentRegistrationForm = {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  apartmentCode: string;
};

type Invoice = {
  invoiceId: number;
  billingMonth?: string;
  dueDate?: string;
  totalAmount?: number;
  status?: string;
  apartment?: {
    apartmentId: number;
    roomNumber: string;
    area?: number;
    occupancyStatus?: string;
  };
  electricFee?: number;
  waterFee?: number;
  managementFee?: number;
  parkingFee?: number;
};

type PaymentInitResponse = {
  success: boolean;
  paymentUrl?: string;
  transactionRef?: string;
  method?: string;
  amount?: number;
  message?: string;
};

type MeterReadingSaveResponse = {
  success: boolean;
  meterReadingId: number;
  monthYear: string;
  electricUsage: number;
  waterUsage: number;
};

type ServiceRequestSaveResponse = {
  success: boolean;
  requestId: number;
  status: string;
  requestType: string;
};

type MeterReading = {
  meterReadingId: number;
  apartment?: { apartmentId: number; roomNumber: string };
  monthYear: string;
  elecOld: number;
  elecNew: number;
  waterOld: number;
  waterNew: number;
};

type ServiceRequest = {
  requestId: number;
  requestType: string;
  title: string;
  status: string;
  createdAt?: string;
};

type NotificationLog = {
  notificationId: number;
  title: string;
  message: string;
  channel: string;
  status: string;
  createdAt?: string;
};

type PendingRegistration = {
  userId: number;
  username: string;
  fullName?: string;
  phoneNumber?: string;
  apartmentCode?: string;
  approvalStatus?: string;
};

const apiBase = '';

async function apiFetch<T>(path: string, options?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const raw = await response.text();
    try {
      const parsed = JSON.parse(raw) as { message?: string; error?: string };
      throw new Error(parsed.message || parsed.error || raw || response.statusText);
    } catch {
      throw new Error(raw || response.statusText);
    }
  }

  return response.json() as Promise<T>;
}

function formatCurrency(value?: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
}

function formatDate(value?: string) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('vi-VN').format(new Date(value));
}

function StatusBadge({ status }: { status?: string }) {
  const normalized = (status || 'UNKNOWN').toUpperCase();
  const tone =
    normalized === 'PAID' || normalized === 'APPROVED'
      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
      : normalized === 'OVERDUE' || normalized === 'REJECTED'
        ? 'border-rose-400/30 bg-rose-400/10 text-rose-200'
        : 'border-amber-400/30 bg-amber-400/10 text-amber-200';

  return <span className={`chip ${tone}`}>{normalized}</span>;
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(() => {
    const raw = localStorage.getItem('smartfee-session');
    return raw ? (JSON.parse(raw) as UserSession) : null;
  });
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'password123' });
  const [registerForm, setRegisterForm] = useState<ResidentRegistrationForm>({
    username: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    apartmentCode: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  // 
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([]);
  const [serviceForm, setServiceForm] = useState({ apartmentId: '1', requestType: 'SERVICE', title: '', content: '' });
  const [meterForm, setMeterForm] = useState({ apartmentId: '1', monthYear: '2026-05', elecOld: '1240', elecNew: '1712', waterOld: '92', waterNew: '118' });
  //

  useEffect(() => {
    if (!session) return;
    localStorage.setItem('smartfee-session', JSON.stringify(session));
  }, [session]);

  async function loadInvoicesAndNotifications() {
    if (!session) return;

    try {
      const [invoiceList, notificationList] = await Promise.all([
        apiFetch<Invoice[]>('/api/invoices', undefined, session.token),
        apiFetch<NotificationLog[]>('/api/notifications/me', undefined, session.token),
      ]);
      setInvoices(invoiceList);
      setNotifications(notificationList);
    } catch {
      setInvoices([]);
      setNotifications([]);
      setError('Không tải được dữ liệu từ backend. Kiểm tra server và database rồi đăng nhập lại.');
    }
  }

  async function loadMeterReadings(apartmentId: number) {
    if (!session || !apartmentId) return;

    try {
      const list = await apiFetch<MeterReading[]>(`/api/meter-readings/apartment/${apartmentId}`, undefined, session.token);
      setReadings(list);
    } catch {
      setReadings([]);
      setError('Không tải được lịch sử chỉ số từ backend.');
    }
  }

  async function loadServiceRequests() {
    if (!session) return;

    try {
      const list = await apiFetch<ServiceRequest[]>('/api/service-requests?status=PENDING', undefined, session.token);
      setRequests(list);
    } catch {
      setRequests([]);
      setError('Không tải được danh sách yêu cầu từ backend.');
    }
  }

  async function loadPendingRegistrations() {
    if (!session || session.role !== 'ADMIN') return;

    try {
      const list = await apiFetch<PendingRegistration[]>('/api/admin/registrations/pending', undefined, session.token);
      setPendingRegistrations(list);
    } catch {
      setPendingRegistrations([]);
      setError('Không tải được danh sách cư dân chờ duyệt.');
    }
  }

  // Tính năng chấp nhận đăng ký tài khoản mới của BQL, chỉ hiện khi admin đăng nhập
  async function handleApproveUser(userId: number) {
    setBusy(true);
    setError('');
    try {
      await apiFetch(`/api/admin/registrations/${userId}/approve`, { method: 'POST' }, session?.token);
      await loadPendingRegistrations(); // Load lại danh sách cho mới
      setError('Đã duyệt tài khoản thành công!');
    } catch {
      setError('Lỗi khi duyệt tài khoản. Kiểm tra lại backend.');
    } finally {
      setBusy(false);
    }
  }
  // Tính năng từ chối đăng ký tài khoản mới của BQL, chỉ hiện khi admin đăng nhập
  async function handleRejectUser(userId: number) {
    setBusy(true);
    setError('');
    try {
      await apiFetch(`/api/admin/registrations/${userId}/reject`, { method: 'POST' }, session?.token);
      await loadPendingRegistrations();
    } catch {
      setError('Lỗi khi từ chối tài khoản. Kiểm tra lại backend.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    void loadInvoicesAndNotifications();
    void loadServiceRequests();
    void loadPendingRegistrations();
  }, [session]);

  const currentInvoice = invoices[0];

  const currentApartmentId = currentInvoice?.apartment?.apartmentId;

  useEffect(() => {
    if (!session || !currentApartmentId) return;
    void loadMeterReadings(currentApartmentId);
  }, [session, currentApartmentId]);

  const stats = useMemo(() => {
    const total = invoices.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    const pending = invoices.filter((item) => (item.status || '').toUpperCase() !== 'PAID').length;
    const paid = invoices.length - pending;
    return { total, pending, paid };
  }, [invoices]);

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setRegisterSuccess(''); // Xóa thông báo đăng ký nếu có khi người dùng chuyển sang đăng nhập
    try {
      // Dùng fetch thuần để dễ dàng bắt chính xác Status 403
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();

      if (response.ok) {
        setSession(data as UserSession);
      } else if (response.status === 403) {
        // Test case 3: BQL chưa duyệt -> Báo lỗi 403
        setError(data.error || 'Tài khoản của bạn đang chờ Ban quản lý xét duyệt.');
      } else {
        // Test case 1: Sai pass -> Báo lỗi 401
        setError(data.error || 'Sai tên đăng nhập hoặc mật khẩu.');
      }
    } catch {
      setError('Không thể kết nối đến server. Kiểm tra lại Backend.');
    } finally {
      setBusy(false);
    }
  }

  async function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setRegisterSuccess('');

    try {
      const response = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const data = await response.json();

      if (response.ok) {
        // Test case 2: Đăng ký thành công -> Hiện thông báo, KHÔNG chuyển về trang login
        setRegisterSuccess(data.message || 'Đăng ký thành công. Vui lòng chờ duyệt.');
        // Tùy chọn: Xóa trắng form sau khi gửi
        setRegisterForm({ username: '', password: '', fullName: '', phoneNumber: '', apartmentCode: '' });
      } else {
        setError(data.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch {
      setError('Không thể kết nối đến server.');
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    localStorage.removeItem('smartfee-session');
    setSession(null);
  }

  async function generateFees() {
    setBusy(true);
    setError('');
    try {
      await apiFetch('/api/invoices/admin/calc-fee', {
        method: 'POST',
        body: JSON.stringify({ month: 5, year: 2026 }),
      }, session?.token);
      setError('Đã kích hoạt tính phí tháng 5/2026.');
      await loadInvoicesAndNotifications();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Không gọi được backend để tính phí.');
    } finally {
      setBusy(false);
    }
  }

  async function markPaid(invoiceId: number) {
    setBusy(true);
    try {
      await apiFetch(`/api/invoices/${invoiceId}/mark-paid`, { method: 'POST' }, session?.token);
      await loadInvoicesAndNotifications();
    } catch {
      setError('Không gạch nợ được trên backend.');
    } finally {
      setBusy(false);
    }
  }

  async function approveRegistration(userId: number) {
    if (!session) return;
    setBusy(true);
    setError('');
    try {
      await apiFetch(`/api/admin/registrations/${userId}/approve`, { method: 'POST' }, session.token);
      await loadPendingRegistrations();
      setError('Đã duyệt đăng ký cư dân.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Không duyệt được đăng ký cư dân.');
    } finally {
      setBusy(false);
    }
  }

  async function rejectRegistration(userId: number) {
    if (!session) return;
    setBusy(true);
    setError('');
    try {
      await apiFetch(`/api/admin/registrations/${userId}/reject`, { method: 'POST' }, session.token);
      await loadPendingRegistrations();
      setError('Đã từ chối đăng ký cư dân.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Không từ chối được đăng ký cư dân.');
    } finally {
      setBusy(false);
    }
  }

  async function payNow(invoiceId: number) {
    setBusy(true);
    try {
      const result = await apiFetch<PaymentInitResponse>('/api/payments', {
        method: 'POST',
        body: JSON.stringify({ invoiceId: String(invoiceId), method: 'VNPAY' }),
      }, session?.token);
      if (result.paymentUrl) {
        window.open(result.paymentUrl, '_blank', 'noopener,noreferrer');
      } else {
        setError(result.message || 'Backend không trả về link thanh toán.');
      }
    } catch {
      setError('Không tạo được link thanh toán từ backend.');
    } finally {
      setBusy(false);
    }
  }

  async function submitMeterReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const saved = await apiFetch<MeterReadingSaveResponse>('/api/meter-readings', {
        method: 'POST',
        body: JSON.stringify({
          apartmentId: Number(meterForm.apartmentId),
          monthYear: meterForm.monthYear,
          elecOld: Number(meterForm.elecOld),
          elecNew: Number(meterForm.elecNew),
          waterOld: Number(meterForm.waterOld),
          waterNew: Number(meterForm.waterNew),
        }),
      }, session?.token);
      await loadMeterReadings(Number(meterForm.apartmentId));
      setError('Đã lưu chỉ số mới.');
      if (!saved.success) {
        setError('Backend không xác nhận được chỉ số mới.');
      }
    } catch {
      setError('Không lưu được chỉ số vào backend.');
    } finally {
      setBusy(false);
    }
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const saved = await apiFetch<ServiceRequestSaveResponse>('/api/service-requests', {
        method: 'POST',
        body: JSON.stringify({
          apartmentId: Number(serviceForm.apartmentId),
          requestType: serviceForm.requestType,
          title: serviceForm.title,
          content: serviceForm.content,
        }),
      }, session?.token);
      await loadServiceRequests();
      setServiceForm((previous) => ({ ...previous, title: '', content: '' }));
      setError(saved.success ? 'Đã gửi yêu cầu.' : 'Backend không xác nhận được yêu cầu.');
    } catch {
      setError('Không gửi được yêu cầu lên backend.');
    } finally {
      setBusy(false);
    }
  }

  const activeView = session?.role === 'ADMIN' ? 'admin' : session?.role === 'RESIDENT' ? 'resident' : session?.role === 'ACCOUNTANT' ? 'accounting' : 'staff';
  const managementLabel = session?.role === 'ADMIN' ? 'Admin' : 'BQL';

  if (!session) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="panel overflow-hidden">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/15 text-xl font-black text-sky-300">SF</div>
                <div>
                  <p className="label">SmartFee Apartment</p>
                  <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-5xl">Phí chung cư, thanh toán, nhắc nợ, đối soát.</h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Giao diện web responsive theo mô tả: cư dân xem hóa đơn trên mobile, BQL nhập chỉ số và chốt phí, kế toán đối soát dòng tiền.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['Mobile-first', 'Trang cư dân tối ưu cho điện thoại'],
                  ['Web Portal', 'BQL và kế toán thao tác trên máy tính'],
                  ['REST + JWT', 'Tách frontend và backend rõ ràng'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="mt-1 text-xs leading-6 text-slate-400">{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            {!isRegistering ? (
              // FORM ĐĂNG NHẬP
              <form className="space-y-5" onSubmit={onLogin}>
                <div>
                  <p className="label">Đăng nhập</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Vào hệ thống</h2>
                </div>

                <div>
                  <label className="label">Tên đăng nhập</label>
                  <input className="input mt-2" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
                </div>

                <div>
                  <label className="label">Mật khẩu</label>
                  <input type="password" className="input mt-2" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                </div>

                {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

                <button className="btn-primary w-full" disabled={busy} type="submit">
                  {busy ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>

                <div className="text-center text-sm text-slate-400 mt-4">
                  Cư dân mới? <button type="button" onClick={() => {setIsRegistering(true); setError(''); setRegisterSuccess('');}} className="text-sky-400 font-bold hover:underline">Đăng ký tài khoản</button>
                </div>
              </form>
            ) : (
              // FORM ĐĂNG KÝ CƯ DÂN
              <form className="space-y-4" onSubmit={onRegister}>
                <div>
                  <p className="label">Dành cho Cư dân</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Đăng ký tài khoản</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Tên đăng nhập</label>
                    <input className="input mt-1" required value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Mật khẩu</label>
                    <input type="password" required className="input mt-1" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="label">Họ và tên</label>
                  <input className="input mt-1" required value={registerForm.fullName} onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Số điện thoại</label>
                    <input className="input mt-1" required value={registerForm.phoneNumber} onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Mã căn hộ (VD: 101)</label>
                    <input className="input mt-1" required value={registerForm.apartmentCode} onChange={(e) => setRegisterForm({ ...registerForm, apartmentCode: e.target.value })} />
                  </div>
                </div>

                {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
                {registerSuccess ? <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{registerSuccess}</p> : null}

                <button className="btn-primary w-full bg-emerald-500 hover:bg-emerald-400" disabled={busy} type="submit">
                  {busy ? 'Đang gửi...' : 'Gửi hồ sơ đăng ký'}
                </button>

                <div className="text-center text-sm text-slate-400 mt-4">
                  Đã có tài khoản? <button type="button" onClick={() => {setIsRegistering(false); setError(''); setRegisterSuccess('');}} className="text-sky-400 font-bold hover:underline">Quay lại Đăng nhập</button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <header className="panel mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="label">SmartFee Apartment</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl">Dashboard Web cho cư dân, BQL và kế toán</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Web-only, responsive, mobile-first. Cư dân xem phí nhanh trên điện thoại; BQL nhập chỉ số và chốt phí; kế toán đối soát giao dịch và gạch nợ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="chip border-sky-400/20 bg-sky-400/10 text-sky-200">{session.role}</span>
          <span className="chip">@{session.username}</span>
          <button className="btn-ghost" onClick={logout}>Đăng xuất</button>
        </div>
      </header>

      {activeView !== 'admin' ? (
        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <StatCard label="Tổng phí" value={formatCurrency(stats.total)} note="Cộng từ các hóa đơn hiện có" />
          <StatCard label="Chưa thanh toán" value={String(stats.pending)} note="Chờ thanh toán hoặc quá hạn" />
          <StatCard label="Đã thanh toán" value={String(stats.paid)} note="Gạch nợ qua gateway/webhook" />
        </section>
      ) : null}

      {error ? <div className="panel mb-6 border-amber-400/20 bg-amber-400/10 text-sm text-amber-100">{error}</div> : null}

      {activeView === 'admin' ? (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="panel">
            <p className="label">Home Admin</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Duyệt đăng ký cư dân</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Màn hình tối giản cho admin: xem danh sách chờ duyệt và xử lý nhanh. Các tính năng quản trị khác sẽ theo wireframe riêng.
            </p>

            <div className="mt-5 flex gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Chờ duyệt</div>
                <div className="mt-1 text-xl font-black text-white">{pendingRegistrations.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Vai trò</div>
                <div className="mt-1 text-xl font-black text-white">ADMIN</div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="label">Danh sách chờ duyệt</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Cư dân đăng ký mới</h3>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {pendingRegistrations.length ? (
                pendingRegistrations.map((item) => (
                  <div key={item.userId} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.fullName || item.username}</div>
                        <div className="mt-1 text-xs text-slate-400">{item.username}</div>
                        <div className="mt-1 text-xs text-slate-500">Căn hộ: {item.apartmentCode || 'N/A'} · SĐT: {item.phoneNumber || 'N/A'}</div>
                        {!item.apartmentCode ? (
                          <div className="mt-2 text-xs text-rose-200">Thiếu mã căn hộ nên không thể duyệt, chỉ có thể từ chối hoặc cập nhật dữ liệu.</div>
                        ) : null}
                      </div>
                      <StatusBadge status={item.approvalStatus} />
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button className="btn-primary flex-1" disabled={busy || !item.apartmentCode} type="button" onClick={() => approveRegistration(item.userId)}>
                        Duyệt
                      </button>
                      <button className="btn-ghost flex-1" disabled={busy} type="button" onClick={() => rejectRegistration(item.userId)}>
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-sm text-slate-400">
                  Không có cư dân nào đang chờ duyệt.
                </div>
              )}
            </div>
          </section>
        </div>
      ) : null}

      {activeView === 'resident' ? (
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="panel">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="label">Hóa đơn tháng hiện tại</p>
                <h2 className="mt-1 text-2xl font-bold text-white">{currentInvoice?.apartment?.roomNumber || 'A-1208'}</h2>
              </div>
              <StatusBadge status={currentInvoice?.status} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <DetailTile title="Tiền điện" value={formatCurrency(currentInvoice?.electricFee)} />
              <DetailTile title="Tiền nước" value={formatCurrency(currentInvoice?.waterFee)} />
              <DetailTile title="Phí quản lý" value={formatCurrency(currentInvoice?.managementFee)} />
              <DetailTile title="Phí gửi xe" value={formatCurrency(currentInvoice?.parkingFee)} />
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="label">Tổng cộng</p>
                  <div className="mt-1 text-3xl font-black text-white">{formatCurrency(currentInvoice?.totalAmount)}</div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <div>Hạn thanh toán</div>
                  <div className="mt-1 font-semibold text-slate-200">{formatDate(currentInvoice?.dueDate)}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1" disabled={busy} onClick={() => currentInvoice && payNow(currentInvoice.invoiceId)}>Thanh toán qua VNPay/Momo</button>
                <button
                  className="btn-ghost flex-1"
                  type="button"
                  disabled={busy}
                  onClick={() => document.getElementById('service-request-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Gửi khiếu nại
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <MiniChart readings={readings} />
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="label">Lịch sử thanh toán</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">Biên lai gần nhất</h3>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.invoiceId} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{invoice.billingMonth}</div>
                        <div className="text-xs text-slate-400">Hóa đơn #{invoice.invoiceId}</div>
                      </div>
                      <StatusBadge status={invoice.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="panel">
              <p className="label">Thông báo đẩy</p>
              <div className="mt-4 space-y-3">
                {notifications.map((item) => (
                  <div key={item.notificationId} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-white">{item.title}</div>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.message}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel" id="service-request-form">
              <p className="label">Gửi yêu cầu / khiếu nại</p>
              <form className="mt-4 space-y-4" onSubmit={submitRequest}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Loại" value={serviceForm.requestType} onChange={(value) => setServiceForm({ ...serviceForm, requestType: value })} options={['SERVICE', 'COMPLAINT']} />
                  <Field label="Căn hộ" value={serviceForm.apartmentId} onChange={(value) => setServiceForm({ ...serviceForm, apartmentId: value })} />
                </div>
                <div>
                  <label className="label">Tiêu đề</label>
                  <input className="input mt-2" value={serviceForm.title} onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })} placeholder="Đăng ký thêm xe / khiếu nại chỉ số" />
                </div>
                <div>
                  <label className="label">Nội dung</label>
                  <textarea className="input mt-2 min-h-28" value={serviceForm.content} onChange={(event) => setServiceForm({ ...serviceForm, content: event.target.value })} placeholder="Mô tả chi tiết yêu cầu..." />
                </div>
                <button className="btn-primary w-full" disabled={busy} type="submit">Gửi yêu cầu</button>
              </form>
            </section>
          </aside>
        </div>
      ) : null}

      {activeView === 'staff' ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="panel">
            <p className="label">Nhập chỉ số</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Web Portal cho {managementLabel}</h2>
            <form className="mt-5 space-y-4" onSubmit={submitMeterReading}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Căn hộ</label>
                  <input className="input mt-2" value={meterForm.apartmentId} onChange={(event) => setMeterForm({ ...meterForm, apartmentId: event.target.value })} />
                </div>
                <div>
                  <label className="label">Tháng</label>
                  <input className="input mt-2" value={meterForm.monthYear} onChange={(event) => setMeterForm({ ...meterForm, monthYear: event.target.value })} placeholder="YYYY-MM" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label="Điện cũ" value={meterForm.elecOld} onChange={(value) => setMeterForm({ ...meterForm, elecOld: value })} />
                <NumberField label="Điện mới" value={meterForm.elecNew} onChange={(value) => setMeterForm({ ...meterForm, elecNew: value })} />
                <NumberField label="Nước cũ" value={meterForm.waterOld} onChange={(value) => setMeterForm({ ...meterForm, waterOld: value })} />
                <NumberField label="Nước mới" value={meterForm.waterNew} onChange={(value) => setMeterForm({ ...meterForm, waterNew: value })} />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1" disabled={busy} type="submit">Lưu chỉ số</button>
                <button className="btn-ghost flex-1" disabled={busy} type="button" onClick={generateFees}>Tính phí toàn bộ</button>
              </div>
            </form>
          </section>

          <section className="panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="label">Danh sách chỉ số / hóa đơn</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Theo dõi xử lý cuối tháng</h3>
              </div>
              <button className="btn-ghost text-xs" disabled={busy} onClick={() => generateFees()}>Chốt bảng phí</button>
            </div>

            <div className="mt-5 space-y-4">
              {readings.map((item) => (
                <div key={item.meterReadingId} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Căn hộ {item.apartment?.roomNumber}</div>
                      <div className="text-xs text-slate-400">{item.monthYear}</div>
                    </div>
                    <span className="chip">Hợp lệ</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-300">
                    <div>Điện: {item.elecOld} → {item.elecNew}</div>
                    <div>Nước: {item.waterOld} → {item.waterNew}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="label">Yêu cầu chờ duyệt</div>
              <div className="mt-4 space-y-3">
                {requests.map((item) => (
                  <div key={item.requestId} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.requestType}</div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="label">Tài khoản Cư dân chờ duyệt</div>
              <div className="mt-4 space-y-3">
                {pendingRegistrations.length === 0 ? (
                  <div className="text-sm text-slate-400">Không có tài khoản nào đang chờ.</div>
                ) : (
                  pendingRegistrations.map((u) => (
                    <div key={u.userId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{u.fullName} (Căn {u.apartmentCode})</div>
                        <div className="text-xs text-slate-400">@{u.username} - ĐT: {u.phoneNumber}</div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="btn-primary py-1 px-3 text-xs bg-emerald-500 hover:bg-emerald-400" 
                          disabled={busy} 
                          onClick={() => handleApproveUser(u.userId)}
                        >
                          Duyệt
                        </button>
                        <button 
                          className="btn-primary py-1 px-3 text-xs bg-rose-500 hover:bg-rose-400" 
                          disabled={busy} 
                          onClick={() => handleRejectUser(u.userId)}
                        >
                          Từ chối
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeView === 'accounting' ? (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <section className="panel">
            <p className="label">Đối soát dòng tiền</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Kế toán</h2>
            <div className="mt-5 space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.invoiceId} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">#{invoice.invoiceId} - {invoice.apartment?.roomNumber}</div>
                      <div className="text-xs text-slate-400">{invoice.billingMonth}</div>
                    </div>
                    <StatusBadge status={invoice.status} />
                  </div>
                  <div className="mt-3 text-sm text-slate-300">{formatCurrency(invoice.totalAmount)}</div>
                  <button className="btn-ghost mt-4 w-full" disabled={busy} onClick={() => markPaid(invoice.invoiceId)}>Gạch nợ bằng tay</button>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="label">Biên lai điện tử</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Lịch sử đối soát</h3>
              </div>
              <span className="chip">Webhook-ready</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {notifications.map((item) => (
                <div key={item.notificationId} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{item.title}</div>
                    <StatusBadge status={item.channel} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.message}</p>
                  <div className="mt-3 text-xs text-slate-500">{formatDate(item.createdAt)}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="label">Xuất báo cáo</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <button className="btn-ghost">Danh sách nợ</button>
                <button className="btn-ghost">Excel doanh thu</button>
                <button className="btn-ghost">Thống kê tháng</button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="panel">
      <div className="label">{label}</div>
      <div className="mt-2 text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{note}</div>
    </div>
  );
}

function DetailTile({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</div>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function Field({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options?: string[] }) {
  return (
    <div>
      <label className="label">{label}</label>
      {options ? (
        <select className="input mt-2" value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input className="input mt-2" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input mt-2" type="number" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function MiniChart({ readings }: { readings: MeterReading[] }) {
  const latest = readings.slice(0, 2).reverse();

  if (!latest.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="label">Lịch sử tiêu thụ</div>
        <h3 className="mt-1 text-lg font-semibold text-white">Biểu đồ mini</h3>
        <p className="mt-5 text-sm text-slate-400">Chưa có dữ liệu chỉ số từ backend.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="label">Lịch sử tiêu thụ</div>
      <h3 className="mt-1 text-lg font-semibold text-white">Biểu đồ mini</h3>
      <div className="mt-5 flex h-44 items-end gap-4">
        {latest.map((item) => {
          const electric = Math.max(18, item.elecNew - item.elecOld);
          const water = Math.max(8, item.waterNew - item.waterOld);
          return (
            <div key={item.meterReadingId} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end gap-2">
                <div className="w-1/2 rounded-t-2xl bg-sky-400/80" style={{ height: `${Math.min(100, electric / 4)}%` }} />
                <div className="w-1/2 rounded-t-2xl bg-emerald-400/80" style={{ height: `${Math.min(100, water / 2)}%` }} />
              </div>
              <div className="text-xs text-slate-400">{item.monthYear}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex gap-4 text-xs text-slate-400">
        <span className="chip">Điện</span>
        <span className="chip">Nước</span>
      </div>
    </div>
  );
}

