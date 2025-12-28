import React from 'react';
export default function StatCard({ icon: Icon, label, value, trend, colorClass }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6 bg-surface-dark  border border-border-dark shadow-sm hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start">
        <div className={`p-2.5 rounded-xl ${colorClass}`}><Icon size={22} /></div>
        {trend && <span className={` text-[10px] font-black px-2 py-1 rounded-full uppercase ${trend === 'Income' || trend.includes('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>{trend}</span>}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase">{label}</p>
        <p className="text-2xl font-black mt-1 text-white">{value}</p>
      </div>
    </div>
  );
}