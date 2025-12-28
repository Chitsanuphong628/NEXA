"use client";
import { useState } from "react";
import "../../../../styles/auth/register.css";
import Nexa from "../../../../component/register/nexa";
import Tap1 from "../../../../component/register/tap1";
import Tap2 from "../../../../component/register/tap2";
import Tap3 from "../../../../component/register/tap3";

export default function RegisterFlow() {
  const [currentTap, setCurrentTap] = useState("tap1");

  // ✅ Map tap name → component
  const tapComponents = {
    tap1: <Tap1 />,
    tap2: <Tap2 />,
    tap3: <Tap3 />,
  };

  return (
    <section>
      <nav>
        <Nexa />
      </nav>

      {/* ปุ่มเปลี่ยน Tap */}
      <div className="tap-buttons">
        <button onClick={() => setCurrentTap("tap1")}>ข้อมูลส่วนตัว</button>
        <button onClick={() => setCurrentTap("tap2")}>ยืนยันรหัส</button>
        <button onClick={() => setCurrentTap("tap3")}>สรุปข้อมูล</button>
      </div>

      {/* แสดง component ตาม tap ที่เลือก */}
      <div className="tap-container">
        {tapComponents[currentTap]}
      </div>
    </section>
  );
}
