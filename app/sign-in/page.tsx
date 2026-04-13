"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-black p-4 transition-colors duration-500">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-700 blur-[120px]" />
      </div>

      <main className="relative w-full max-w-[440px] z-10">
        <div className="rounded-[40px] bg-white dark:bg-[#0f0f0f] p-10 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/5 transition-all">
          
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-16 w-16 rounded-2xl bg-[#005a8d] flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-blue-500/20 font-black">
              S
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">SalaryApp</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-center">Welcome back, please login.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="admin@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400">Password</label>
                <button type="button" className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">Forgot?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                required
              />
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs py-3 px-4 rounded-xl font-bold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#005a8d] py-4 text-white font-black transition-all hover:bg-[#0077b6] hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </span>
            </button>

            <div className="text-center mt-8 pt-4 border-t border-slate-100 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => router.push("/sign-up")}
                  className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline ml-1"
                >
                  Sign Up Free
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}