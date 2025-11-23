import '../../styles/main/MainPage/MainPage.css'
export default function MainPage() {
    return (
        <section>
            <header>
                <nav>
                    <ul>
                        <img src="/Logo/logo.png" alt="Exnode-logo" style={{ width: '50px', height: '50px' }} />
                        <h1>Exnode</h1>

                    </ul>
                    <ul>
                        <li>หน้าหลัก</li>
                        <li>ธุรกรรม</li>
                        <li>ผลวิเคราะห์</li>
                        <li>รายการ</li>
                        <li>แจ้งปัญหา</li>
                        <li>ข่าวสาร</li>
                    </ul>
                    <ul>
                        <img src="/" alt="Exnode-user-profile" />
                    </ul>
                </nav>
            </header>
            <div className='banner'>
                <h1>สวัสดี คุณ สีแหด นำดี, ยินดีต้อนรับสู่ Exnode</h1>
                <div>
                    <p>รายได้เฉลี่ยต่อเดือน: 30,000 บาท</p> 
                    <p>อาชีพ แม่ค้า</p>
                </div>
                <div className='section-container'>
                    <div className='section-1'>ภาษี</div>
                    <div className='section-2'>หนี้สิน</div>
                    <div className='section-3'>xxx</div>
                    <div className='section-4'>xxx</div>
                    <div className='section-5'>xxx</div>
                    <div className='section-6'>การลงทุน</div>
                </div>
            </div>
        </section>
    )
}