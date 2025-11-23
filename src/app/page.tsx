import Image from "next/image";
import Head from "next/head";
import "./../../styles/LandingPage.css";
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Head>
        <title>Nexa แพลตฟอร์มการเงิน | จัดการรายรับรายจ่ายง่าย</title>
        <meta
          name="description"
          content="แพลตฟอร์มการเงินออนไลน์ สำหรับจัดการรายรับรายจ่าย และวิเคราะห์การเงินส่วนตัว"
        />
      </Head>
      <header>
        <nav>
        <Image
          src="/Logo/nexa.png"
          alt="nexa-logo"
          width={220}
          height={120}
          style={{ marginLeft: "20px" }}
        />
          <ul>
            <li>หน้าแรก</li>
            <li>ธุรกรรม</li>
            <li>วิเคราะห์</li>
            <li>รายการ</li>
            <li>ติดต่อ</li>
            <li>ข่าวสาร</li>
          </ul>
        <div className ="button-header">
          <Link href ='/auth/login'>
            <button> Log In </button>
          </Link>
        </div>
      </nav>
    </header>
    <section className="section-1">
      <div className="section-1-L">
        <h1><span>Nexa</span> แพลตฟอร์มการจัดการทางการเงิน</h1>
        <p>แพลตฟอร์มการจัดการทางการเงิน คือระบบดิจิทัลที่ช่วยผู้ใช้วางแผน ควบคุม และติดตามการเงินของตัวเอง<br></br> ทั้งบันทึกรายรับ-รายจ่าย จัดงบประมาณ ลงทุน และวิเคราะห์แนวโน้มการเงิน</p>
        <div className="button-section-1-L">
              <button>ดูคุณสมบัติ</button>
              <button>อ่านบทความ</button>
        </div>
      </div>
      <div></div>
    </section>
    </>
  );
}
