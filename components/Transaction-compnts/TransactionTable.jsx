import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

export default function TransactionTable({ transactions = [] }) {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. เพิ่ม State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // แปลงข้อมูล (Logic เดิม)
  const formattedData = transactions.map(tx => ({
    ...tx,
    category: tx.category || 'General', 
    numericAmount: typeof tx.amount === 'string' 
      ? parseFloat(tx.amount.replace(/,/g, '')) 
      : tx.amount,
    type: tx.isPositive ? 'income' : 'expense' 
  }));

  // Logic การกรองข้อมูล
  const filteredData = formattedData.filter(item => {
    const matchesType = filterType === 'All' || 
                        (filterType === 'Income' && item.isPositive) || 
                        (filterType === 'Expense' && !item.isPositive);
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // 2. เอฟเฟกต์สำหรับรีเซ็ตหน้า เมื่อมีการค้นหาหรือเปลี่ยน filter
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchTerm]);

  // 3. คำนวณ Index สำหรับตัดแบ่งหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // ฟังก์ชันเปลี่ยนหน้า
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-200 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      
      {/* --- Top Bar: Search & Filters (เหมือนเดิม) --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหารายการ..." 
            className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#1E293B] p-1 rounded-xl">
            {['All', 'Income', 'Expense'].map((type) => (
                <button 
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        filterType === type 
                        ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-white' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>
      </div>

      {/* --- Main Table --- */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-[#1E293B]">
              <tr className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <th className="p-4 pl-6">Transaction</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-[#1E293B]/50">
              {/* ใช้ currentItems แทน filteredData เพื่อแสดงแค่ 10 รายการ */}
              {currentItems.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                            tx.isPositive 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                            : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                        }`}>
                            {tx.isPositive ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                        </div>
                        <span className="font-bold text-sm truncate max-w-[150px]">{tx.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tx.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className={`p-4 text-right font-bold text-sm whitespace-nowrap ${
                      tx.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-200'
                  }`}>
                    {tx.isPositive ? '+' : '-'}{Math.abs(tx.numericAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex size-2 rounded-full ${tx.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                  <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400 font-medium">ไม่พบรายการที่ค้นหา</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* --- Footer / Pagination (Logic ใหม่) --- */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2 gap-4">
           <span className="text-xs text-slate-500 dark:text-slate-400">
             Showing <span className="font-bold text-slate-900 dark:text-white">{indexOfFirstItem + 1}</span> - <span className="font-bold text-slate-900 dark:text-white">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredData.length}</span> items
           </span>
           
           <div className="flex gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600 dark:text-slate-300"
              >
                Previous
              </button>
              
              {/* Optional: แสดงเลขหน้าปัจจุบัน */}
              <div className="flex items-center px-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                 Page {currentPage} / {totalPages}
              </div>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
           </div>
        </div>
      )}
    </div>
  );
}