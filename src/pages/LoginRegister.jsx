import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Lock, User, Home, Phone, Eye, EyeOff, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginRegister() {
  // Kích hoạt hook điều hướng của react-router-dom
  const navigate = useNavigate(); 

  // Quản lý tab: 'login' hoặc 'register'
  const [activeTab, setActiveTab] = useState('login');
  
  // Trạng thái đóng/mở mắt xem mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // States dành cho Form Đăng nhập
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // States dành cho Form Đăng ký
  const [registerData, setRegisterData] = useState({
    fullName: '',
    phone: '',
    username: '',
    apartmentNumber: '',
    password: '',
    confirmPassword: ''
  });

  // States quản lý UI/UX xử lý dữ liệu
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiAlert, setApiAlert] = useState(null); // { type: 'success'|'error', message: '' }

  // Xử lý đổi giá trị Input Đăng nhập
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Xử lý đổi giá trị Input Đăng ký
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Validate Form Đăng nhập
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.username.trim()) {
      newErrors.username = 'Tên tài khoản không được để trống';
    }
    if (!loginData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Form Đăng ký (Theo UC-R07 và Quy tắc nghiệp vụ BR-06, BR-09)
  const validateRegister = () => {
    const newErrors = {};
    const phoneRegex = /^(0[3|5|7|8|9])+([0-8]{8})\b$/;

    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống';
    }
    if (!registerData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!phoneRegex.test(registerData.phone)) {
      newErrors.phone = 'Số điện thoại không đúng định dạng Việt Nam';
    }
    if (!registerData.username.trim()) {
      newErrors.username = 'Tên tài khoản không được để trống';
    }
    if (!registerData.apartmentNumber.trim()) {
      newErrors.apartmentNumber = 'Vui lòng nhập/chọn số căn hộ hợp lệ để định danh quyền sở hữu';
    }
    if (!registerData.password) {
      newErrors.password = 'Mật khẩu bắt buộc phải nhập';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa tối thiểu 6 ký tự';
    }
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý Đăng nhập và Điều hướng phân quyền
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setApiAlert(null);

    try {
      // Giả lập gọi API POST /auth/login
      const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (loginData.username === 'admin' && loginData.password === 'password123') {
            resolve({ token: 'mock-jwt-token-admin', role: 'ADMIN' });
          } else if (loginData.username === 'cu_dan_01' && loginData.password === 'password123') {
            resolve({ token: 'mock-jwt-token-resident', role: 'RESIDENT' });
          } else {
            reject(new Error('Tài khoản hoặc mật khẩu không chính xác trên hệ thống.'));
          }
        }, 1500);
      });

      setApiAlert({
        type: 'success',
        message: 'Đăng nhập thành công! Hệ thống đang chuyển hướng tới bảng điều khiển...'
      });

      // Tạo hiệu ứng chờ chuyển trang mượt mà sau khi hiển thị Alert
      setTimeout(() => {
        if (res.role === 'ADMIN') {
          navigate('/admin/dashboard'); 
        } else if (res.role === 'RESIDENT') {
          navigate('/resident/dashboard'); 
        }
      }, 1200);

    } catch (err) {
      setApiAlert({
        type: 'error',
        message: err.message || 'Có lỗi kết nối hệ thống, vui lòng thử lại sau.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Giả lập xử lý Đăng ký
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsLoading(true);
    setApiAlert(null);

    try {
      // Giả lập gọi API đăng ký hệ thống cư dân
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setApiAlert({
        type: 'success',
        message: `Đăng ký thành công căn hộ ${registerData.apartmentNumber}! Mật khẩu của bạn đã được mã hóa Bcrypt bảo mật thành công. Vui lòng chuyển sang Đăng nhập.`
      });
      
      // Xóa sạch form sau khi đăng ký thành công
      setRegisterData({
        fullName: '',
        phone: '',
        username: '',
        apartmentNumber: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setApiAlert({
        type: 'error',
        message: 'Đăng ký thất bại. Số căn hộ đã có chủ hộ đăng ký trước đó.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased font-sans">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid md:grid-cols-2">
        
        {/* Banner giới thiệu bên trái */}
        <div className="hidden md:flex bg-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-10 pointer-events-none bg-gradient-to-br from-blue-500 to-transparent"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider uppercase">SmartFee Apartment</span>
          </div>
          
          <div className="my-auto relative z-10 space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Quản Lý Phí & <br />Thanh Toán Số Hóa
            </h1>
            <p className="text-slate-400 text-base max-w-sm leading-relaxed">
              Giải pháp công nghệ minh bạch giúp cư dân theo dõi chỉ số điện nước, hóa đơn dịch vụ và thanh toán trực tuyến tức thì qua cổng VNPay/Momo.
            </p>
          </div>

          <div className="text-xs text-slate-500 relative z-10 border-t border-slate-800 pt-4 flex justify-between">
            <span>&copy; 2026 SmartFee Platform</span>
            <span>Version 1.0.0</span>
          </div>
        </div>

        {/* Khu vực xử lý Form bên phải */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Header Chuyển Đổi Chế Độ Tab UI */}
          <div className="flex border-b border-slate-200 mb-8 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => { setActiveTab('login'); setApiAlert(null); setErrors({}); }}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => { setActiveTab('register'); setApiAlert(null); setErrors({}); }}
            >
              Đăng ký cư dân
            </button>
          </div>

          {/* Banner Thông Báo Phản Hồi Từ API */}
          {apiAlert && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 animate-fadeIn ${
              apiAlert.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {apiAlert.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium leading-relaxed">{apiAlert.message}</p>
            </div>
          )}

          {/* PHÂN HỆ PHÂN PHỐI GIAO DIỆN FORM CHÍNH */}
          {activeTab === 'login' ? (
            <form onSubmit={handleSubmitLogin} className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Chào mừng bạn trở lại</h2>
                <p className="text-sm text-slate-500">Vui lòng điền thông tin tài khoản để truy cập hệ thống hóa đơn.</p>
              </div>

              {/* Input Username */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-600">Tên đăng nhập</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-slate-800 text-sm transition-all placeholder-slate-400
                      ${errors.username ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'}
                      focus:ring-4 outline-none`}
                    placeholder="Ví dụ: cu_dan_01 hoặc admin"
                  />
                </div>
                {errors.username && <p className="text-xs font-semibold text-rose-600">{errors.username}</p>}
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-600">Mật khẩu</label>
                  <a href="#forgot" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">Quên mật khẩu?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`w-full pl-11 pr-11 py-3 bg-white border rounded-xl text-slate-800 text-sm transition-all placeholder-slate-400
                      ${errors.password ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'}
                      focus:ring-4 outline-none`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-semibold text-rose-600">{errors.password}</p>}
              </div>

              {/* Button Submit Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Xác thực tài khoản'
                )}
              </button>
            </form>
          ) : (
            /* FORM ĐĂNG KÝ CƯ DÂN */
            <form onSubmit={handleSubmitRegister} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Đăng ký tài khoản mới</h2>
                <p className="text-sm text-slate-500">Cung cấp chính xác số căn hộ để BQL xác minh chủ sở hữu.</p>
              </div>

              {/* Tên cư dân */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">HỌ VÀ TÊN CƯ DÂN</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                      ${errors.fullName ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                      outline-none focus:ring-2 focus:ring-blue-100`}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-600">{errors.fullName}</p>}
              </div>

              {/* Số điện thoại */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">SỐ ĐIỆN THOẠI LH</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                      ${errors.phone ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                      outline-none focus:ring-2 focus:ring-blue-100`}
                    placeholder="0912345678"
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-600">{errors.phone}</p>}
              </div>

              {/* Số căn hộ */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">MÃ SỐ CĂN HỘ (VÍ DỤ: P102)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Home className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="apartmentNumber"
                    value={registerData.apartmentNumber}
                    onChange={handleRegisterChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                      ${errors.apartmentNumber ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                      outline-none focus:ring-2 focus:ring-blue-100`}
                    placeholder="Nhập chính xác số phòng, tòa nhà"
                  />
                </div>
                {errors.apartmentNumber && <p className="text-xs text-rose-600">{errors.apartmentNumber}</p>}
              </div>

              {/* Tên tài khoản mong muốn */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">TÊN TÀI KHOẢN ĐĂNG NHẬP</label>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                    ${errors.username ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                    outline-none focus:ring-2 focus:ring-blue-100`}
                  placeholder="nguyenvana123"
                />
                {errors.username && <p className="text-xs text-rose-600">{errors.username}</p>}
              </div>

              {/* Khối Mật khẩu kép */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">MẬT KHẨU</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                      ${errors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                      outline-none focus:ring-2 focus:ring-blue-100`}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">XÁC NHẬN MẬT KHẨU</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl text-slate-800 text-sm transition-all
                      ${errors.confirmPassword ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'}
                      outline-none focus:ring-2 focus:ring-blue-100`}
                    placeholder="Nhập lại mật khẩu"
                  />
                  {errors.confirmPassword && <p className="text-xs text-rose-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Nút gửi yêu cầu đăng ký */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Gửi yêu cầu xác thực'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}