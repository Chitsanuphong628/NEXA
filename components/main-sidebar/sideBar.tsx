"use client";

import Image from "next/image";
import {BarChart2, Settings, LayoutDashboard,BadgeDollarSign, LogOut } from "lucide-react";
//การเซตค่า เพื่อดูการเปิดปิด sidebar
interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function SideBar({ isOpen, setIsOpen, activeTab, setActiveTab }: SideBarProps) {
  return (
    <aside 
      // นำ onClick ออกจาก aside เพื่อไม่ให้ทับซ้อนกับปุ่มเมนูข้างใน
       onClick={() => setIsOpen(!isOpen) }
       className={`bg-background-dark transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} border-r border-border-dark flex flex-col h-screen text-[#92adc9]`}
    >
      {/* --- Header Section --- */}
      <div className="p-4 h-20 flex items-end"> 
        {/* ใช้ items-end เพื่อให้ของข้างในชิดล่างพื้นที่ 20px */}       
         <div className={`flex items-end w-full ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
          
          {/* ส่วนของ Image (แสดงตลอดเวลา) */}
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            className="cursor-pointer hover:opacity-80 transition-all flex-shrink-0"
          >
            <Image
              className={`transition-transform duration-300 ${!isOpen && 'rotate-180 scale-90'}`} 
              src="/Logo/nexa.png"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
          </div>

          {/* ส่วนของข้อความ NEXA (แสดงเฉพาะตอนเปิด) */}
          {isOpen && (
            <div>
              <h2 className="font-bold text-1xl text-gray-200 leading-none mb-1 animate-in fade-in duration-500">
                NEXA
              </h2>
              <p className="text-xs">test plan</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Navigation Section --- */}
      <nav className="flex-1 px-3 space-y-2 mt-8">
        <SidebarItem 
          icon={<BadgeDollarSign size={22} />} 
          label="Transaction" 
          isOpen={isOpen} 
          active={activeTab === "transaction"}
          onClick={() => setActiveTab("transaction")} 
        />
        <SidebarItem 
          icon={<BarChart2 size={22} />} 
          label="Analytics" 
          isOpen={isOpen} 
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")} 
        />
        <SidebarItem 
          icon={<Settings size={22} />} 
          label="Settings" 
          isOpen={isOpen} 
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")} 
        />
      </nav>
      <button  className="flex w-full justify-center items-center gap-1 text-xl  ">
        <h1>log out</h1> <LogOut/>
      </button>
    </aside>
  );
}


function SidebarItem({ icon, label, isOpen, active, onClick,}: any) {
  // สร้างฟังก์ชันจัดการการคลิกใหม่
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // หยุด Event ไม่ให้เด้งไปถึงตัว aside
    onClick();           // ทำงานเปลี่ยน Tab ตามปกติ
  };

  return (
    <button
      onClick={handleItemClick} // ใช้ฟังก์ชันที่เราสร้างใหม่
      className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group
        ${active ? "bg-[#233648] text-white shadow-lg shadow-blue-900/20" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
    >
      <div className={`${active ? "text-white" : "text-grey-400 group-hover:text-white"}`}>{icon}</div>
      {isOpen && <span className="ml-4 font-medium">{label}</span>}
    </button>
  );
}