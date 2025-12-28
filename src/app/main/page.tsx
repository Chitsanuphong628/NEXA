"use client";

import { useState } from "react";
import SideBar from "../../../components/main-sidebar/sideBar";
import { Menu } from "lucide-react";
import Image from "next/image";
import TransactionView from "../features/transaction";
// สร้าง Type สำหรับ Tab เพื่อป้องกันการพิมพ์ผิด
type TabType = "dashboard" | "analytics" | "settings";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("transaction"); // ค่าเริ่มต้นเป็น dashboard

  return (
    <section className="flex h-screen w-screen bg-background-dark text-slate-900 ">
      {/* ส่งทั้ง isOpen และ activeTab เข้าไปใน SideBar */}
      <SideBar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
           


        {/* --- ส่วนแสดงเนื้อหาตาม Tab --- */}
        <div className=" overflow-y-auto ">
          <div className="">
            {activeTab === "transaction" && <TransactionView />}
            {activeTab === "analytics" && <AnalyticsView />}
            {activeTab === "settings" && <SettingsView />}
          </div>
        </div>
      </main>
    </section>
  );
}

// --- Component ย่อยสำหรับแต่ละหน้า ---


function AnalyticsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Analytics & Reports</h2>
      <p className="text-gray-500">กราฟแสดงผลการวิเคราะห์ข้อมูลทางการเงินของคุณจะปรากฏที่นี่</p>
      <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center text-gray-400">
        [ Chart Placeholder ]
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">System Settings</h2>
      <div className="bg-white rounded-2xl border border-gray-200 divide-y">
        <div className="p-4 flex justify-between items-center">
          <span>Dark Mode</span>
          <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-4 flex justify-between items-center">
          <span>Notifications</span>
          <div className="w-10 h-5 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}