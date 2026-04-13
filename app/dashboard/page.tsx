"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

// Sub-komponen Card Statistik - Otomatis adaptif
const StatCard = ({ label, value, trend, icon, trendClass }: any) => (
  <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-6 border border-slate-200 dark:border-white/5 hover:border-sky-500/20 dark:hover:border-white/10 transition-all shadow-sm dark:shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl opacity-60">{icon}</span>
      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${trendClass}`}>
        {trend}
      </span>
    </div>
    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    <p className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{value}</p>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 shrink-0 bg-white dark:bg-black">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/10 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back, Admin!</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Here's what's happening with your payroll system today.</p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <StatCard label="Total Karyawan" value="124" trend="+12%" icon="👥" trendClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" />
            <StatCard label="Divisi" value="8" trend="Stable" icon="🏢" trendClass="bg-slate-500/10 text-slate-500 dark:text-slate-400" />
            <StatCard label="Payroll Bulan Ini" value="Rp 450M" trend="+5%" icon="💰" trendClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" />
            <StatCard label="Pending Approval" value="12" trend="-2" icon="⏳" trendClass="bg-rose-500/10 text-rose-600 dark:text-rose-500" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Activities */}
            <div className="rounded-3xl bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-2xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                Recent Activities
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl group-hover:bg-sky-500/10 transition-colors">
                      📄
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">Updated Divisi "IT Support"</p>
                      <p className="text-sm text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-[#0a0a0a]">
              <div className="h-16 w-16 bg-slate-200 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-2xl">🚀</div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white">New Reports Coming Soon</h4>
              <p className="text-slate-500 mt-2 max-w-[250px]">We're building advanced analytics for your payroll.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;