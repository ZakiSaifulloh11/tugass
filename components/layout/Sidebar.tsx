"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sub-komponen NavItem dengan integrasi Link Next.js
const NavItem = ({ label, iconPath, href }: { label: string; iconPath: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all group ${
        isActive ? "bg-[#00bcd4]/20 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}>
        <svg
          className={`w-6 h-6 ${isActive ? "text-[#00bcd4]" : "opacity-70 group-hover:opacity-100"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
        <span className={`font-medium text-lg ${isActive ? "text-white" : ""}`}>{label}</span>
      </div>
    </Link>
  );
};

// Sub-komponen SubItem dengan integrasi Link Next.js
const SubItem = ({ label, iconPath, href }: { label: string; iconPath: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer transition-colors group ${
        isActive ? "text-[#00bcd4]" : "text-slate-400 hover:text-white"
      }`}>
        <svg
          className={`w-[20px] h-[20px] ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
        <span className="text-[15px] font-medium tracking-wide">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  return (
    <aside className="w-[280px] h-screen bg-[#073b5c] flex flex-col py-6 px-4 shrink-0 overflow-hidden border-r border-white/5">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
          s
        </div>
        <div className="font-bold text-2xl text-white tracking-tight">
          Salary<span className="text-[#00bcd4]">App</span>
        </div>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <NavItem
          href="/dashboard"
          label="Dashboard"
          iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />

        {/* Master Dropdown */}
        <div className="mt-1">
          <div
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className="flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white cursor-pointer select-none"
          >
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3M4 12c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
              </svg>
              <span className="font-semibold text-lg">Master</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isMasterOpen ? "" : "-rotate-90"}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isMasterOpen && (
            <div className="flex flex-col ml-6 gap-1 border-l border-white/10 mt-1">
              <SubItem 
                href="/divisi" 
                label="Divisi" 
                iconPath="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" 
              />
              <SubItem href="/jabatan" label="Jabatan" iconPath="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              <SubItem href="/karyawan" label="Karyawan" iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
              <SubItem href="/user" label="User" iconPath="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" />
              <SubItem href="/configurasi" label="Konfigurasi" iconPath="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 t=" />
            </div>
          )}
        </div>

        {/* Menu Lainnya */}
        <div className="mt-4 flex flex-col gap-2">
          <NavItem href="/presensi" label="Presensi" iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <NavItem href="/cuti" label="Cuti" iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <NavItem href="/gaji" label="Gaji" iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <NavItem
          href="/sign-in"
          label="Logout"
          iconPath="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </div>
    </aside>
  );
};

export default Sidebar;