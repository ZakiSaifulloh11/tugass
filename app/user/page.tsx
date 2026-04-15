"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function UserPage() {
  // 1. STATE MANAGEMENT
  // Inisialisasi dengan data dummy agar tabel tidak kosong saat pertama buka
  const [dataUser, setDataUser] = useState<any[]>([
    { id: 1, nama: "Aris Munandar", email: "aris@mail.com", role: "MANAGER" },
    { id: 2, nama: "Zaki Saifullah", email: "zaki@mail.com", role: "ADMIN" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    id: null as number | null,
    nama: "",
    email: "",
    password: "",
    role: "User / Karyawan"
  });

  // 2. FUNGSI CRUD (Local Logic)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) return alert("Nama dan Email wajib diisi!");

    // Tentukan string role yang akan disimpan
    const formattedRole = formData.role.toUpperCase().includes("ADMIN") ? "ADMIN" : 
                          formData.role.toUpperCase().includes("MANAGER") ? "MANAGER" : "USER";

    if (formData.id) {
      // --- LOGIC UPDATE ---
      const updatedData = dataUser.map((user) => 
        user.id === formData.id 
        ? { ...user, nama: formData.nama, email: formData.email, role: formattedRole } 
        : user
      );
      setDataUser(updatedData);
      alert("Data berhasil diperbarui!");
    } else {
      // --- LOGIC CREATE ---
      const newUser = {
        id: Date.now(), // Generate ID unik sederhana
        nama: formData.nama,
        email: formData.email,
        role: formattedRole
      };
      setDataUser([...dataUser, newUser]);
      alert("Data berhasil ditambahkan!");
    }
    
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      const filteredData = dataUser.filter(user => user.id !== id);
      setDataUser(filteredData);
      if (formData.id === id) resetForm(); // Reset jika sedang di-edit
    }
  };

  const handleEdit = (user: any) => {
    setFormData({
      id: user.id,
      nama: user.nama,
      email: user.email,
      password: "", // Kosongkan password saat edit untuk keamanan
      role: user.role === "ADMIN" ? "Admin HRD" : 
            user.role === "MANAGER" ? "Manager" : "User / Karyawan"
    });
    // Scroll otomatis ke form
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
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
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
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">Management User</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Control system access and user permissions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
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
                    <label className="text-sm font-bold text-slate-500 ml-1">Nama</label>
                    <input name="nama" value={formData.nama} onChange={handleChange} type="text" placeholder="Nama Lengkap" className="input-style" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="input-style" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Password</label>
                    <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="input-style" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Role</label>
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

            {/* Table Section */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data User</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataUser.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold text-center">Role</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataUser.length > 0 ? (
                        dataUser.map((item, index) => (
                          <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all">
                            <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                            <td className="px-6 py-6">
                              <p className="font-bold text-slate-700 dark:text-slate-100">{item.nama}</p>
                              <p className="text-xs text-slate-400">{item.email}</p>
                            </td>
                            <td className="px-6 py-6 text-center">
                              <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${
                                item.role === 'ADMIN' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
                                item.role === 'MANAGER' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                                'bg-slate-500/10 text-slate-500 border-slate-500/20'
                              }`}>
                                {item.role}
                              </span>
                            </td>
                            <td className="px-6 py-6 pr-8 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
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
                        ))
                      ) : (
                        <tr><td colSpan={4} className="p-10 text-center text-slate-400 italic">No data found in database.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Detail (Sama seperti sebelumnya) */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-[440px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl border border-white/10 overflow-hidden">
               <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8">
                  <h3 className="text-2xl font-bold text-white">{selectedUser.nama}</h3>
                  <p className="text-white/70">System Access Profile</p>
               </div>
               <div className="p-8 space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Email Account</p>
                    <p className="text-sm font-bold p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-white/5">{selectedUser.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Access Role</p>
                      <p className="font-bold">{selectedUser.role}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Account Status</p>
                      <span className="text-emerald-500 text-[10px] font-black italic">● Verified Access</span>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 font-bold">Close Detail</button>
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