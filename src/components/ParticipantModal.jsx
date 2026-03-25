import React from 'react';

const ParticipantModal = ({ participants, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-2xl text-[#4A2C2A] tracking-tight italic">Participants</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF8F3] text-[#FF7A00] shadow-sm active:scale-95 transition-all">
            <span className="material-symbols-outlined font-bold">close</span>
          </button>
        </div>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {participants && participants.length > 0 ? (
            participants.map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#FFF8F3] p-4 rounded-2xl border border-orange-100/50">
                <div className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center text-white font-headline font-black">
                   {p.userName?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-headline font-bold text-[#4A2C2A]">{p.userName || 'Thành viên'}</p>
                  <p className="text-[10px] font-bold text-[#FF7A00] uppercase tracking-widest opacity-60">Đã đăng ký</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-[#8E7C7A] font-medium italic">Chưa có ai tham gia buổi này.</p>
          )}
        </div>
        
        <button onClick={onClose} className="w-full py-4 bg-gradient-to-r from-[#FF7A00] to-[#E55A00] text-white rounded-2xl font-headline font-black uppercase tracking-tight shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ParticipantModal;
