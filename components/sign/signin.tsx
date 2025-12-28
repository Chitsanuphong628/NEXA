"use client";
import { useState } from "react";
import { auth } from '../../lib/firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleIcon from "../../src/asset/svg/google";
import AppleIcon from "../../src/asset/svg/apple";
import FacebookIcon from "../../src/asset/svg/facebook";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/main");
        } catch (error: any) {
            alert("Login ล้มเหลว: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Email Section */}
                <div className="space-y-1 border-l-2 border-[#66d4d0] pl-3"> {/* แก้ border-s เป็น border-l เพื่อความชัวร์ และเปลี่ยนสีให้เด่นขึ้น */}
                    <label className="text-sm text-gray-400 block">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // ใช้ focus:ring-0 และ outline-none เพื่อปิดเส้นขอบมาตรฐาน
                        className="w-full bg-transparent text-white placeholder-gray-500 outline-none focus:outline-none focus:ring-0 border-none px-0 py-1"
                    />
                </div>

                {/* Password Section */}
                <div className="space-y-1 border-l-2 border-[#66d4d0] pl-3">
                    <label className="text-sm text-gray-400 block">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent text-white placeholder-gray-500 outline-none focus:outline-none focus:ring-0 border-none px-0 py-1"
                    />
                </div>
                <button 
                    className="bg-[#66d4d0] text-black font-bold w-full h-10 rounded hover:bg-opacity-90 transition" 
                    type="submit"
                >
                    เข้าสู่ระบบ
                </button>
                <div className="flex justify-center gap-4 pt-4 w-full border-t-2 border-surface-dark">
                    <button
                         type="button"
                        className="flex justify-center items-center w-10 h-10 rounded-full border border-white/20 hover:opacity-70 transition"
                                    >
                        <GoogleIcon />
                    </button>

                    <button
                        type="button"
                        className="flex justify-center items-center w-10 h-10 rounded-full border border-white/20 hover:opacity-70 transition"
                                    >
                        <AppleIcon />
                    </button>

                    <button
                        type="button"
                        className="flex justify-center items-center w-10 h-10 rounded-full border border-white/20 hover:opacity-70 transition"
                                        >
                        <FacebookIcon />
                    </button>
                </div>
            </form>
        </div>
    );
}