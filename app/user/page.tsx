"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function UserPage() {
  // 1. STATE MANAGEMENT
  const [dataUser, setDataUser] = useState([
    { id: 1, nama: "Admin HRD", email: "hrd@mail.com", role: "ADMIN" },
    { id: 2, nama: "John Doe", email: "john@mail.com", role: "USER" },
    { id: 3, nama: "Jane Smith", email: "jane@mail.com", role: "USER" },
  ]);

  const [formData, setFormData] = useState({
    id: null as number | null,
    nama: "",
    email: "",
    password: "",
    role: "User / Karyawan"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 2. FUNGSI CRUD
  
  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create & Update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) return alert("Nama dan Email wajib diisi!");

    if (formData.id) {
      // Logic Update
      setDataUser(dataUser.map(user => user.id === formData.id ? { ...formData, id: user.id } as any : user));
      alert("Data berhasil diperbarui!");
    } else {
      // Logic Create
      const newUser = {
        id: Date.now(),
        nama: formData.nama,
        email: formData.email,
        role: formData.role.toUpperCase().includes("ADMIN") ? "ADMIN" : "USER"
      };
      setDataUser([...dataUser, newUser]);
      alert("Data berhasil ditambahkan!");
    }
    resetForm();
  };

  // Delete
  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setDataUser(dataUser.filter(user => user.id !== id));
    }
  };

  // Edit (Set data ke form)
  const handleEdit = (user: any) => {
    setFormData({
      id: user.id,
      nama: user.nama,
      email: user.email,
      password: "", // Password dikosongkan saat edit untuk keamanan
      role: user.role === "ADMIN" ? "Admin HRD" : "User / Karyawan"
    });
    // Scroll ke atas agar user tahu form terisi
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ id: null, nama: "", email: "", password: "", role: "User / Karyawan" });
  };

  const openDetail = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto relative">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0 transition-colors">
          <h1 className="text-xl font-bold">User</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white border border-white/10 font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold tracking-tight">Management User</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Control system access and user permissions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah/Edit User */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl font-bold">
                      {formData.id ? "✎" : "+"}
                    </div>
                    <h3 className="text-xl font-bold">{formData.id ? "Edit User" : "Tambah User"}</h3>
                  </div>
                  {formData.id && (
                    <button type="button" onClick={resetForm} className="text-xs text-rose-500 font-bold hover:underline">Batal</button>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Nama</label>
                    <input name="nama" value={formData.nama} onChange={handleChange} type="text" placeholder="Nama Lengkap" className="input-style" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="input-style" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Password</label>
                    <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="input-style" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="input-style appearance-none cursor-pointer">
                      <option>User / Karyawan</option>
                      <option>Admin HRD</option>
                      <option>Manager</option>
                    </select>
                  </div>
                  
                  <button type="submit" className={`w-full ${formData.id ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#005a8d] hover:bg-[#0077b6]'} text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95`}>
                    {formData.id ? "Update Data" : "Simpan User"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabel Data User */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data User</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataUser.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 dark:text-slate-500 text-[12px] uppercase tracking-widest">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold">Email</th>
                        <th className="px-6 py-6 font-bold text-center">Role</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataUser.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-400 dark:text-slate-50">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-100">{item.nama}</td>
                          <td className="px-6 py-6 text-sm text-slate-500 dark:text-slate-400">{item.email}</td>
                          <td className="px-6 py-6 text-center">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${
                              item.role === 'ADMIN' 
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' 
                              : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                            }`}>
                              {item.role}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => openDetail(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              </button>
                              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {dataUser.length === 0 && (
                    <div className="p-10 text-center text-slate-400">Belum ada data user.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Detail User (Tetap Sama) */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-all" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-[440px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in duration-300">
              <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">✕</button>
                <h3 className="text-2xl font-bold text-white">{selectedUser.nama}</h3>
                <p className="text-white/70 font-medium tracking-wide">System Access Profile</p>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Email Account</p>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Access Role</p>
                    <p className="font-bold text-slate-900 dark:text-white">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Account Status</p>
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-tighter italic">● Verified Access</span>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm mt-4">
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          background-color: transparent;
          border: 1px solid rgba(203, 213, 225, 0.5);
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          color: inherit;
          transition: all 0.3s;
        }
        :global(.dark) .input-style {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .input-style:focus {
          outline: none;
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
      `}</style>
    </div>
  );
}