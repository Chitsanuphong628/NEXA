import React, { useState, useEffect } from 'react';
import { 
  Lock, X, Sparkles, Bot, Loader2, Send, ReceiptText, 
  User, Calendar, TrendingUp, AlertTriangle, CheckCircle, PieChart,
  ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

// ==========================================
// 1. Password Modal
// ==========================================
export const PasswordModal = ({ isOpen, onSubmit }) => {
  const [input, setInput] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <div className="flex justify-center mb-4"><div className="p-4 bg-blue-100 rounded-full text-blue-600"><Lock size={32} /></div></div>
        <h3 className="text-xl font-black text-center mb-2 text-slate-900 dark:text-white">ยืนยันรหัสผ่าน</h3>
        <input type="password" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && onSubmit(input)} className="w-full text-center text-2xl font-black tracking-widest p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl mb-4" placeholder="••••••••" autoFocus />
        <button onClick={() => onSubmit(input)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">ปลดล็อค</button>
      </div>
    </div>
  );
};

// ==========================================
// 2. AI Modal (New: Analysis Dashboard)
// ==========================================
export const AIModal = ({ isOpen, onClose, transactions = [] }) => {
  const [status, setStatus] = useState('idle'); // idle | analyzing | result
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (isOpen && status === 'result') {
      // Optional: Reset status when reopening
      // setStatus('idle'); 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    setStatus('analyzing');
    // จำลองการประมวลผล 1.5 วินาที
    setTimeout(() => {
      const totalIncome = transactions.filter(t => t.isPositive).reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
      const totalExpense = transactions.filter(t => !t.isPositive).reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
      
      const catCounts = {};
      transactions.filter(t => !t.isPositive).forEach(t => {
        const catName = t.category || t.title; // ใช้ Category หรือ Title
        catCounts[catName] = (catCounts[catName] || 0) + 1;
      });
      const mostFrequent = Object.keys(catCounts).length > 0 
        ? Object.keys(catCounts).reduce((a, b) => catCounts[a] > catCounts[b] ? a : b) 
        : '-';

      let advice = "";
      let healthScore = "Good";
      
      if (transactions.length === 0) {
        advice = "ยังไม่มีข้อมูลธุรกรรมเพียงพอให้วิเคราะห์ ลองเริ่มจดบันทึกรายรับรายจ่ายดูนะครับ";
        healthScore = "N/A";
      } else if (totalExpense > totalIncome) {
        advice = "⚠️ คุณมีการใช้จ่ายเกินรายรับ! ควรลดรายจ่ายที่ไม่จำเป็น หรือสำรองเงินเผื่อฉุกเฉิน";
        healthScore = "Risk";
      } else if (totalIncome > 0 && (totalExpense / totalIncome) > 0.8) {
        advice = "ระวัง! รายจ่ายของคุณเกือบชนเพดานรายรับแล้ว ลองออมเงินเพิ่มอีกนิดนะครับ";
        healthScore = "Warning";
      } else {
        advice = "เยี่ยมมาก! สุขภาพทางการเงินของคุณแข็งแรงดี มีเงินออมคงเหลือ";
        healthScore = "Excellent";
      }

      setAnalysis({
        totalIncome,
        totalExpense,
        mostFrequent,
        advice,
        healthScore,
        txCount: transactions.length
      });
      setStatus('result');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:p-8 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden relative min-h-[500px]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-surface-dark to-background-dark text-white flex justify-between items-center">
           <div className="flex items-center gap-3">
             <Sparkles className="text-yellow-300" />
             <div>
               <h3 className="text-xl font-black">FinAI Advisor</h3>
               <p className="text-xs text-indigo-100 opacity-80">ผู้ช่วยวิเคราะห์สุขภาพการเงิน</p>
             </div>
           </div>
           <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition"><X /></button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
          
          {status === 'idle' && (
            <div className="text-center space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-full inline-block mb-4">
                <Bot size={64} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">พร้อมวิเคราะห์ข้อมูลหรือยัง?</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                AI จะช่วยสรุปพฤติกรรมการใช้จ่าย ค้นหารูรั่วทางการเงิน และให้คำแนะนำที่เหมาะสมกับคุณจาก {transactions.length} รายการล่าสุด
              </p>
              <button 
                onClick={handleAnalyze}
                disabled={transactions.length === 0}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {transactions.length === 0 ? 'ไม่มีข้อมูลให้วิเคราะห์' : '✨ เริ่มวิเคราะห์ทันที'}
              </button>
            </div>
          )}

          {status === 'analyzing' && (
            <div className="text-center space-y-4">
              <Loader2 size={48} className="animate-spin text-indigo-600 mx-auto" />
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300 animate-pulse">กำลังประมวลผลข้อมูล...</p>
              <p className="text-xs text-slate-400">ตรวจสอบรายการรับจ่าย • คำนวณความถี่ • สร้างคำแนะนำ</p>
            </div>
          )}

          {status === 'result' && analysis && (
            <div className="w-full space-y-6 animate-in zoom-in-95 duration-500">
              <div className={`p-6 rounded-2xl border-l-8 shadow-sm flex items-start gap-4 ${
                analysis.healthScore === 'Excellent' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' :
                analysis.healthScore === 'Risk' ? 'bg-rose-50 border-rose-500 text-rose-800' :
                'bg-amber-50 border-amber-500 text-amber-800'
              }`}>
                {analysis.healthScore === 'Excellent' ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                <div>
                  <h4 className="font-black text-lg mb-1">ผลการวิเคราะห์: {analysis.healthScore}</h4>
                  <p className="text-sm opacity-90">{analysis.advice}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs font-bold uppercase"><TrendingUp size={14}/> จ่ายบ่อยสุด</div>
                  <p className="font-black text-xl text-slate-800 dark:text-white truncate" title={analysis.mostFrequent}>{analysis.mostFrequent}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs font-bold uppercase"><PieChart size={14}/> สัดส่วนรายจ่าย</div>
                   <p className="font-black text-xl text-slate-800 dark:text-white">
                     {analysis.totalIncome > 0 ? ((analysis.totalExpense / analysis.totalIncome) * 100).toFixed(1) : 0}%
                   </p>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button onClick={() => setStatus('idle')} className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline">
                  วิเคราะห์ใหม่
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. ViewAll Modal
// ==========================================
export const ViewAllModal = ({ isOpen, onClose, transactions, summary }) => {
    const [tab, setTab] = useState('list');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:p-10 animate-in fade-in">
             <div className="bg-[#0F172A] w-full h-full max-w-6xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-2xl font-black flex gap-2"><ReceiptText /> รายการทั้งหมด</h3>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="p-4 border-b border-slate-800 flex gap-4 bg-[#0F172A]">
                    <button onClick={()=>setTab('list')} className={`px-4 py-2 rounded-lg font-bold transition ${tab==='list'?'bg-blue-600 text-white':'bg-slate-800 text-slate-400'}`}>รายการ</button>
                    <button onClick={()=>setTab('frequency')} className={`px-4 py-2 rounded-lg font-bold transition ${tab==='frequency'?'bg-blue-600 text-white':'bg-slate-800 text-slate-400'}`}>อันดับคู่ค้า</button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-[#0F172A]">
                    {tab === 'list' && (
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <tbody>{transactions.map(tx => (
                                <tr key={tx.id} className="bg-slate-800/50 hover:bg-slate-800 transition rounded-xl">
                                    <td className="px-4 py-3 text-xs font-bold text-slate-400 w-32">{tx.date.split(' ')[0]}</td>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-200">{tx.title}</td>
                                    <td className={`px-4 py-3 text-right font-black ${tx.isPositive?'text-emerald-400':'text-rose-400'}`}>{tx.isPositive?'+':'-'}{Number(tx.amount).toLocaleString()}</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    )}
                     {tab === 'frequency' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {summary.frequency.map((item, i) => (
                                 <div key={i} className="bg-slate-800 p-4 rounded-xl shadow-sm flex justify-between items-center">
                                     <div><p className="font-bold text-slate-200">{item.name}</p><p className="text-xs text-slate-400">{item.count} ครั้ง</p></div>
                                     <div className="text-right"><p className="text-rose-400 font-bold">-{Number(item.expense).toLocaleString()}</p></div>
                                 </div>
                             ))}
                         </div>
                     )}
                </div>
             </div>
        </div>
    )
};

// ==========================================
// 4. Profile Modal
// ==========================================
export const ProfileModal = ({ isOpen, onClose, userProfile, onSave }) => {
    const [name, setName] = useState(userProfile.name || '');
    const [birthDate, setBirthDate] = useState(userProfile.birthDate || '');
  
    useEffect(() => {
      if (isOpen) {
        setName(userProfile.name || '');
        setBirthDate(userProfile.birthDate || '');
      }
    }, [isOpen, userProfile]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400"><User size={32} /></div>
          </div>
          
          <h3 className="text-xl font-black text-center mb-6 text-slate-900 dark:text-white">ข้อมูลส่วนตัว</h3>
          
          <div className="space-y-4">
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">ชื่อเรียกเล่น</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold"
                    placeholder="เช่น Alex"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block flex items-center gap-2">
                    <Calendar size={12}/> วันเกิด (ใช้ปลดล็อค PDF)
                </label>
                <input 
                    type="date" 
                    value={birthDate} 
                    onChange={e => setBirthDate(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold"
                />
                <p className="text-[10px] text-slate-400 mt-2">
                    *ระบบจะนำวันเกิดไปแปลงเป็นรหัส (ววดดปปปป) เพื่อลองปลดล็อคไฟล์ให้อัตโนมัติ
                </p>
            </div>
          </div>
  
          <button 
            onClick={() => onSave({ name, birthDate })} 
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold mt-6 hover:bg-blue-700 transition-all"
          >
            บันทึก
          </button>
        </div>
      </div>
    );
  };