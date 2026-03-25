import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../services/fundService';

const CATEGORIES = {
  income: ['Thành viên đóng quỹ', 'Thu phí sân', 'Tài trợ', 'Thu phí giải đấu', 'Thu khác'],
  expense: ['Tiền thuê sân', 'Mua bóng thi đấu', 'Chi phí giải đấu', 'Mua dụng cụ', 'Chi khác'],
};

const today = new Date().toISOString().split('T')[0];

const formatAmount = (val) => {
  const num = val.replace(/\D/g, '');
  return num ? new Intl.NumberFormat('vi-VN').format(parseInt(num, 10)) : '';
};

const AddTransaction = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [type, setType] = useState('income'); // income | expense
  const [rawAmount, setRawAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES.income[0]);
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleTypeSwitch = (t) => {
    setType(t);
    setCategory(CATEGORIES[t][0]);
  };

  const handleAmountInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setRawAmount(raw);
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rawAmount || parseInt(rawAmount, 10) < 1000) {
      alert('Vui lòng nhập số tiền (tối thiểu 1.000đ)');
      return;
    }
    setSaving(true);
    try {
      await addTransaction({
        type,
        description: category + (notes ? ` – ${notes}` : ''),
        category,
        notes,
        amount: parseInt(rawAmount, 10),
        date,
        imagePreview: imagePreview || null,
      });
      navigate('/fund');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const displayAmount = rawAmount ? new Intl.NumberFormat('vi-VN').format(parseInt(rawAmount, 10)) : '0';
  const isIncome = type === 'income';

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-14 pb-4 bg-[#FDF8F5]">
        <button onClick={() => navigate('/fund')} className="w-9 h-9 flex items-center justify-center text-[#C35A00] active:scale-90 transition">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-headline font-bold text-lg text-[#1C1B1F]">Tạo giao dịch</h1>
        <button onClick={() => navigate('/fund')} className="w-9 h-9 flex items-center justify-center text-[#8C7A6B]">
          <span className="material-symbols-outlined text-xl">history</span>
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 pb-32 space-y-4">

        {/* Tab Toggle */}
        <div className="flex bg-[#F2EDE8] p-1 rounded-2xl mb-2">
          {[['income', 'Thu tiền'], ['expense', 'Chi tiền']].map(([val, label]) => (
            <button
              key={val} type="button"
              onClick={() => handleTypeSwitch(val)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                type === val
                  ? 'bg-white text-[#C35A00] shadow-sm'
                  : 'text-[#8C7A6B]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className={`bg-white rounded-2xl px-5 py-5 border-2 ${isIncome ? 'border-green-400/40' : 'border-[#E6846A]/40'}`}>
          <p className="font-label text-[10px] font-black uppercase tracking-widest text-[#8C7A6B] mb-2">SỐ TIỀN (VND)</p>
          <div className="flex items-center gap-2">
            <span className={`font-headline font-black text-3xl ${isIncome ? 'text-green-600' : 'text-[#C35A00]'}`}>đ</span>
            <input
              type="tel"
              inputMode="numeric"
              value={displayAmount === '0' && !rawAmount ? '' : displayAmount}
              onChange={handleAmountInput}
              placeholder="0"
              className={`flex-1 font-headline font-black text-4xl bg-transparent outline-none text-[#1C1B1F] placeholder-[#C5B8AE] w-full`}
            />
            <span className={`font-label text-sm font-bold ${isIncome ? 'text-green-500' : 'text-[#C35A00]'}`}>VND</span>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#C35A00] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
            <span className="font-label text-xs font-bold text-[#8C7A6B] uppercase tracking-widest">
              {isIncome ? 'Danh mục thu' : 'Danh mục chi'}
            </span>
          </div>
          <div className="relative">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full font-body font-semibold text-[#1C1B1F] bg-transparent outline-none appearance-none text-base py-1 pr-6"
            >
              {CATEGORIES[type].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-0 top-1.5 text-[#C35A00] text-lg pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Date */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#C35A00] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            <span className="font-label text-xs font-bold text-[#8C7A6B] uppercase tracking-widest">Ngày thực hiện</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full font-body font-semibold text-[#1C1B1F] bg-transparent outline-none text-base"
          />
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#C35A00] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            <span className="font-label text-xs font-bold text-[#8C7A6B] uppercase tracking-widest">Nội dung chi tiết</span>
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder={`Nhập ghi chú ${isIncome ? 'thu' : 'chi'} tiền tại đây...`}
            rows={3}
            className="w-full font-body text-sm text-[#1C1B1F] bg-transparent outline-none resize-none placeholder-[#C5B8AE]"
          />
        </div>

        {/* Image Attachment */}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
        <div
          onClick={() => fileRef.current.click()}
          className="bg-white rounded-2xl px-5 py-4 shadow-sm border-2 border-dashed border-[#E6D6CC] flex items-center gap-4 cursor-pointer hover:border-[#C35A00]/40 transition-colors"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Hóa đơn" className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#FFF0E5] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#C35A00] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_photo_alternate</span>
            </div>
          )}
          <div className="flex-1">
            <p className="font-bold text-sm text-[#1C1B1F]">Đính kèm ảnh</p>
            <p className="text-[10px] text-[#8C7A6B] font-medium">{imagePreview ? 'Bấm để đổi ảnh' : 'Hóa đơn, biên lai (JPG, PNG)'}</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-[#C35A00]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#C35A00] text-base">add</span>
          </div>
        </div>

      </form>

      {/* Submit Button - fixed at bottom */}
      <div className="fixed bottom-0 left-0 w-full px-5 pb-8 pt-3 bg-gradient-to-t from-[#FDF8F5] via-[#FDF8F5]/95 to-transparent">
        <button
          type="submit"
          form="tx-form"
          onClick={handleSubmit}
          disabled={saving}
          className={`w-full h-14 rounded-2xl font-black text-base text-white flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all disabled:opacity-60 ${
            isIncome
              ? 'bg-gradient-to-r from-[#FF7A00] to-[#C35A00]'
              : 'bg-gradient-to-r from-[#C35A00] to-[#8B3A00]'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          {saving ? 'Đang lưu...' : `Lưu giao dịch ${isIncome ? 'thu' : 'chi'}`}
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
