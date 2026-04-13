"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register gagal");

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-black p-4 transition-colors duration-500 overflow-hidden relative">
      
      {/* Background Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/20 dark:bg-blue-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 blur-[120px]" />
      </div>

      <main className="relative w-full max-w-[460px] z-10">
        <div className="rounded-[40px] bg-white dark:bg-[#0f0f0f] p-10 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-slate-200 dark:border-white/5 transition-all">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#005a8d] to-[#00b4d8] flex items-center justify-center text-white text-2xl mb-4 shadow-xl shadow-blue-500/20 font-black">
              S
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-center">
              Start managing your payroll system more efficiently.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* FULL NAME */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                required
              />
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs py-3 px-4 rounded-xl font-bold flex items-center gap-2">
                <span className="text-sm">⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-2xl bg-[#005a8d] py-4 text-white font-black transition-all hover:bg-[#0077b6] hover:shadow-2xl hover:shadow-blue-500/30 disabled:opacity-50 active:scale-[0.98] mt-2 group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <div className="text-center mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => router.push("/sign-in")}
                  className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}