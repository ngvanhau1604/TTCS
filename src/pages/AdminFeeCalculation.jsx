import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminFeeCalculation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    apartmentNumber: '', managementFeeRate: '10000', area: '75',
    electricityOld: '', electricityNew: '', waterOld: '', waterNew: ''
  });

  const [calculatedFees, setCalculatedFees] = useState({
    managementTotal: 0, electricityTotal: 0, waterTotal: 0, grandTotal: 0
  });

  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const management = (Number(formData.managementFeeRate) * Number(formData.area)) || 0;
    const elecDiff = (Number(formData.electricityNew) - Number(formData.electricityOld)) || 0;
    const electricity = elecDiff > 0 ? elecDiff * 2500 : 0;
    const waterDiff = (Number(formData.waterNew) - Number(formData.waterOld)) || 0;
    const water = waterDiff > 0 ? waterDiff * 11000 : 0;

    setCalculatedFees({
      managementTotal: management,
      electricityTotal: electricity,
      waterTotal: water,
      grandTotal: management + electricity + water
    });
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
    setError('');
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    if (!formData.apartmentNumber.trim()) {
      setError('Vui lòng nhập số căn hộ để định danh phát hành.');
      return;
    }
    if (Number(formData.electricityNew) < Number(formData.electricityOld) || Number(formData.waterNew) < Number(formData.waterOld)) {
      setError('Chỉ số mới không được nhỏ hơn chỉ số cũ.');
      return;
    }
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        <button type="button" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all mb-2">
          <ArrowLeft className="w-4 h-4" /> <span>Quay lại Bảng điều khiển</span>
        </button>

        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" /> Khối Tính Phí &amp; Xuất Hóa Đơn Tự Động
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form onSubmit={handleGenerateInvoice} className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Số liệu tiêu thụ</h3>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Mã Căn Hộ *</label>
                <input type="text" name="apartmentNumber" placeholder="Ví dụ: P102" value={formData.apartmentNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm font-semibold focus:bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Diện tích (m²)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:bg-white" />
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100/70 space-y-3">[cite: 2]
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block">Chỉ số Điện tiêu thụ (kWh)</span>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="electricityOld" placeholder="Chỉ số cũ" value={formData.electricityOld} onChange={handleChange} className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm" />
                <input type="number" name="electricityNew" placeholder="Chỉ số mới" value={formData.electricityNew} onChange={handleChange} className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm" />
              </div>
            </div>

            <div className="p-3.5 bg-cyan-50/50 rounded-xl border border-cyan-100/70 space-y-3">[cite: 2]
              <span className="text-xs font-bold text-cyan-800 uppercase tracking-wide block">Chỉ số Nước sinh hoạt (m³)</span>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="waterOld" placeholder="Chỉ số cũ" value={formData.waterOld} onChange={handleChange} className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm" />
                <input type="number" name="waterNew" placeholder="Chỉ số mới" value={formData.waterNew} onChange={handleChange} className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Chốt số liệu &amp; Khởi tạo hóa đơn
            </button>
          </form>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Bản xem trước chi phí</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Phí quản lý:</span><span className="font-bold text-slate-900">{calculatedFees.managementTotal.toLocaleString()} đ</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Tiền điện:</span><span className="font-bold text-slate-900">{calculatedFees.electricityTotal.toLocaleString()} đ</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Tiền nước:</span><span className="font-bold text-slate-900">{calculatedFees.waterTotal.toLocaleString()} đ</span></div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between text-sm font-black"><span>Tổng cộng:</span><span className="text-blue-600">{calculatedFees.grandTotal.toLocaleString()} đ</span></div>
              </div>
            </div>
            {isSaved && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900">Khởi tạo hóa đơn thành công!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}