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
