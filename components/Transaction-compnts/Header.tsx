import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ReadPDF from './ReadPDF';

export default function Header({ userProfile, showBalances, setShowBalances, onDataLoaded }) {
  return (
    <nav className="px-6 py-4 bg-background-dark flex justify-between items-end  top-0 z-30 shadow-sm">
      <div className="grid items-center gap-3">
        <h1 className="text-4xl font-semibold text-white">Transactions</h1>
        <p className="text-border-dark">Track,filter,and your finacial history</p>
      </div>
      <div className="flex items-center gap-4">
        <ReadPDF onDataLoaded={onDataLoaded} />
      </div>
    </nav>
  );
} {/*ห้ามใช้   header css มีปัญหา */}