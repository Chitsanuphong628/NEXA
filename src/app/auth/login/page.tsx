<<<<<<< HEAD
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 1. เพิ่ม Suspense
import LoginForm from "../../../../components/sign/signin"; // อย่าลืมเปลี่ยนชื่อโฟลเดอร์เป็น auth ตามที่คุยกันนะครับ
import Image from "next/image";

// แยกเนื้อหาออกมาเพื่อให้ใช้ useSearchParams ได้อย่างปลอดภัย
function SignContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // กำหนดค่าเริ่มต้นให้ชัดเจนเพื่อป้องกัน Layout กระโดด
  const tab = (searchParams.get("tab") as "login" | "signup") || "login";

  const setTab = (nextTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", nextTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const tabBtn = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200
     ${active ? "bg-background-dark text-white shadow-lg" : "bg-transparent text-gray-400 hover:text-gray-200"}`;

  return (
    <section className="bg-background-dark w-full min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      {/* ฝั่งซ้าย */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-12 lg:py-0 text-white z-20">
        <div className="w-full max-w-md">
          <nav className="mb-8 w-full "> {/*ห้ามใช้   header css มีปัญหา */}
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Nexa is ready to assist your financial decisions.</p>
          </nav>

          <div className="w-full grid grid-cols-2 gap-2 rounded-xl bg-surface-dark p-1.5 mb-8 border border-white/5">
            <button onClick={() => setTab("login")} className={tabBtn(tab === "login")}>Login</button>
            <button onClick={() => setTab("signup")} className={tabBtn(tab === "signup")}>Sign Up</button>
          </div>

          <div className="min-h-[300px]"> {/* ล็อคความสูงขั้นต่ำไว้ลดอาการวูบวาบ */}
            {tab === "login" ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>

      {/* ฝั่งขวา */}
      <div className="hidden lg:block lg:relative lg:w-1/2 h-screen">
         <Image src="/background/login/bg.png" alt="bg" fill className="object-cover" priority />
      </div>
    </section>
  );
}

// ไฟล์หลักให้ส่งออก Component ที่ห่อด้วย Suspense
export default function SignPage() {
  return (
    <Suspense fallback={<div className="bg-background-dark h-screen w-full" />}>
      <SignContent />
    </Suspense>
  );
}
function SignupForm() {

  return <div className="rounded-xl bg-surface-dark p-8 border border-white/5">SIGNUP FORM CONTENT</div>;

}
/* มีแก้บัค กระโดดของcss */
=======
"use client"; // ให้ component ทำงานฝั่ง client
import "./../../../../styles/auth/login.css"
import Image from 'next/image';
import { useState } from "react";
import { auth } from '../../../../lib/firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleIcon from "../../../../component/svg/google";
import AppleIcon from "../../../../component/svg/apple";
import FacebookIcon from "../../../../component/svg/facebook";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            router.push("/main");
        } catch (error: any) {
            alert("Login ล้มเหลว: " + error.message);
        }
    };

    return (
        <section>
            <div className="left-login">
                <div>
                    <Image
                        src="/Logo/nexa.png"
                        alt="nexa-logo"
                        width={350}
                        height={200}
                        style={{ marginLeft: "20px" }}
                    />
                </div>
                <div>
                      <form onSubmit={handleLogin}>
                    <h1>ยินดีต้อนรับสู่ Nexa</h1>
                    <label>
                        <input  
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </label>
                    <label>
                        <input  
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        /> 
                    </label>
                    <button className="login-button" type="submit">เข้าสู่ระบบ</button>
                    <label className="register-other">
                        <GoogleIcon/>
                        <AppleIcon/>
                        <FacebookIcon/>
                    </label>
                    <p>ยังไม่มีบัญชี? <a href="/auth/register">สมัครสมาชิก</a></p>
                </form>
                </div>
            </div>
            <div className="right-login">
                
            </div>
        </section>
    )
}
>>>>>>> 6929679fe6c97bbec07cbf5cda0dbb08754215eb
