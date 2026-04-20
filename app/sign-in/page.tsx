"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau password salah.");
      }

      const token = data.token || data.data?.token;
      const userData = data.user || data.data?.user;
      const userRole = userData?.role || (email === "hrd@mail.com" ? "admin" : "user");

      if (token) localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", userRole);

      alert(`Login Berhasil sebagai ${userRole === "admin" ? "Admin" : "Karyawan"}!`);
      router.push(userRole === "admin" ? "/dashboard" : "/home");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dekorasi Background Bulatan Halus */}
      <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-[80px]" />

      <main className="relative z-10 w-full max-w-[480px]">
        {/* Card Utama */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 transition-all">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#004a7c] to-[#002a45] rounded-2xl flex items-center justify-center shadow-lg mb-6 transform hover:rotate-6 transition-transform">
               <span className="text-white font-black text-3xl">I</span>
            </div>
            <h2 className="text-3xl font-black text-[#1a2b3c] tracking-tight">
              ZAKIII <span className="text-blue-500">PAY</span>
            </h2>
            <p className="text-gray-400 mt-2 font-medium">
              Silakan login untuk mengakses akun Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-4 rounded-2xl mb-6 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-slate-900"
                />
                <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors" size={20} />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <button type="button" className="text-[11px] font-bold text-[#004a7c] hover:underline uppercase tracking-widest">
                  Lupa?
                </button>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-slate-900"
                />
                <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004a7c] hover:bg-[#003559] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-8 text-center border-t border-gray-50 pt-8">
            <p className="text-gray-400 font-medium text-sm">
              Belum punya akun?{" "}
              <button
                type="button"
                className="text-[#004a7c] font-bold hover:underline"
                onClick={() => router.push("/sign-up")}
              >
                Hubungi Admin
              </button>
            </p>
          </div>
        </div>

        {/* Link Kembali ke Beranda */}
        <button
          onClick={() => router.push("/")}
          className="mt-8 mx-auto flex items-center gap-2 text-gray-400 hover:text-[#004a7c] font-bold text-xs uppercase tracking-widest transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </button>
      </main>
    </div>
  );
}