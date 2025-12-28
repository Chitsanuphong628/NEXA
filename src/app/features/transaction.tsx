import React, { useState, useMemo, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownLeft, ChevronRight, Sparkles, Trash2 } from 'lucide-react';
import { calculateSummary } from './../../utilities/helpers';
// import { callGeminiAPI } from './../../utilities/api'; // (Comment ไว้ก่อนถ้ายังไม่ได้ใช้)

// Components
import Header from '../../../components/Transaction-compnts/Header';
import StatCard from '../../../components/Transaction-compnts/StatCard';
import { AIModal, ViewAllModal, ProfileModal} from '../../../components/Transaction-compnts/Modals';

// Import ตารางที่เราเพิ่งสร้าง (สมมติว่าไฟล์อยู่ใน folder เดียวกัน)
import TransactionTable from '../../../components/Transaction-compnts/TransactionTable'; 

export default function Dashboard() {
  const [showBalances, setShowBalances] = useState(true);
  
  // State ข้อมูลต่างๆ
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [userProfile, setUserProfile] = useState({ name: 'Alex', birthDate: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState([]);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);

  // โหลดข้อมูลจาก LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTx = localStorage.getItem('finai_transactions');
      const savedBal = localStorage.getItem('finai_balance');
      const savedProfile = localStorage.getItem('finai_profile');

      if (savedTx) setTransactions(JSON.parse(savedTx));
      if (savedBal) setTotalBalance(parseFloat(savedBal));
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
      
      setIsLoaded(true);
    }
  }, []);

  // บันทึกข้อมูล
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('finai_transactions', JSON.stringify(transactions));
      localStorage.setItem('finai_balance', totalBalance.toString());
      localStorage.setItem('finai_profile', JSON.stringify(userProfile));
    }
  }, [transactions, totalBalance, userProfile, isLoaded]);

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const handleDataLoaded = (tx, balance) => {
    setTransactions(tx);
    setTotalBalance(balance);
  };

  const handleClearData = () => {
    if(confirm('คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่?')) {
        setTransactions([]);
        setTotalBalance(0);
        localStorage.removeItem('finai_transactions');
        localStorage.removeItem('finai_balance');
    }
  };
  
  const handleSaveProfile = (newProfile) => {
      setUserProfile(newProfile);
      setShowProfileModal(false);
  };

  const handleAIChat = async (prompt) => { 
      // ใส่ Logic AI ของคุณที่นี่
  };

  return (
    <div className="min-h-screen bg-background-dark  text-slate-900 flex flex-col transition-colors duration-300">
      
      {/* Header */}
      <Header 
        userProfile={userProfile} 
        showBalances={showBalances} 
        setShowBalances={setShowBalances}
        onDataLoaded={handleDataLoaded}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Top Actions */}
        {transactions.length > 0 && (
            <div className="flex justify-end">
                <button onClick={handleClearData} className="text-rose-500 text-xs font-bold flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded transition">
                    <Trash2 size={14} /> ล้างข้อมูลทั้งหมด
                </button>
            </div>
        )}

        {/* 1. Stat Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={ArrowUpRight} 
            label="รายรับรวม" 
            value={`฿${summary.income.toLocaleString()}`} 
            trend="+12%" // ตัวอย่าง Mock Trend
            colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" 
          />
          <StatCard 
            icon={ArrowDownLeft} 
            label="รายจ่ายรวม" 
            value={`฿${summary.expense.toLocaleString()}`} 
            trend="-5%" 
            colorClass="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" 
          />
          <StatCard 
            icon={TrendingUp} 
            label="ยอดคงเหลือ" 
            value={`฿${totalBalance.toLocaleString()}`} 
            trend="+2.4%" 
            colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
          />
        </div>

        {/* 2. AI Banner */}
        <div className="bg-gradient-to-br from-surface-dark to-background-dark rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-lg text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Sparkles className="text-yellow-300" />
                        <span className="font-black tracking-widest text-sm opacity-80 uppercase">AI Advisor</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">ให้ AI ช่วยวิเคราะห์สุขภาพการเงิน</h2>
                    <p className="text-white/80 text-sm">รับคำแนะนำอัจฉริยะจากข้อมูลการใช้จ่ายจริงของคุณ</p>
                </div>
                <button onClick={() => setShowAIModal(true)} className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap">
                    เริ่มวิเคราะห์ <ChevronRight size={20} />
                </button>
            </div>
        </div>

        {/* 3. Transaction Table (New UI) */}
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">ประวัติธุรกรรม</h3>
                <button onClick={() => setIsViewAllOpen(true)} className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">
                    จัดการทั้งหมด
                </button>
            </div>
            {/* ส่ง transactions state เข้าไปในตาราง */}
            <TransactionTable transactions={transactions} />
        </section>

      </main>

      {/* --- Modals --- */}
      // เปลี่ยนจากของเดิมที่เป็น chatHistory เป็น transactions
      <AIModal 
        isOpen={showAIModal} 
        onClose={() => setShowAIModal(false)} 
        transactions={transactions} // <--- ส่ง transactions เข้าไปแทน
      />
      <ViewAllModal isOpen={isViewAllOpen} onClose={() => setIsViewAllOpen(false)} transactions={transactions} summary={summary} />
      
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        userProfile={userProfile} 
        onSave={handleSaveProfile} 
      />
    </div>
  );
}