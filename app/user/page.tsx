"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import axios from "axios";

// 1. DEFINISI ENDPOINT
const API_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";

export default function UserPage() {
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    id: null as number | null,
    name: "", // Menggunakan 'name' sesuai field API
    email: "",
    password: "",
    role: "USER"
  });

  // Helper untuk Header Auth
  const getAuthConfig = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
  };

  // --- 2. FUNGSI CRUD API ---

  // FETCH DATA (READ)
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL, getAuthConfig());
      // API Laravel biasanya mengembalikan { data: [...] } atau { data: { data: [...] } }
      const result = response.data.data || response.data;
      setDataUser(Array.isArray(result) ? result : []);
    } catch (error: any) {
      console.error("Gagal mengambil data:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Nama dan Email wajib diisi!");

    try {
      if (formData.id) {
        // LOGIC UPDATE (PUT)
        const updatePayload = { ...formData };
        if (!formData.password) delete (updatePayload as any).password;

        await axios.put(`${API_URL}/${formData.id}`, updatePayload, getAuthConfig());
        alert("Data berhasil diperbarui!");
      } else {
        // LOGIC CREATE (POST)
        if (!formData.password) return alert("Password wajib untuk user baru!");
        await axios.post(API_URL, formData, getAuthConfig());
        alert("Data berhasil ditambahkan!");
      }
      resetForm();
      fetchUsers(); // Refresh tabel
    } catch (error: any) {
      alert(error.response?.data?.message || "Terjadi kesalahan pada server.");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthConfig());
        alert("User berhasil dihapus!");
        fetchUsers();
      } catch (error) {
        alert("Gagal menghapus user.");
      }
    }
  };

  // --- LOGIKA UI ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user: any) => {
    setFormData({
      id: user.id,
      name: user.name || user.nama, // Handling jika key API berbeda
      email: user.email,
      password: "", 
      role: user.role
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", password: "", role: "USER" });
  };

  const openDetail = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto relative">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">User Management</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-xs text-slate-500">Payroll System</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FORM SECTION */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <h3 className="text-xl font-bold mb-6">{formData.id ? "Edit User" : "Tambah User"}</h3>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Nama</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Nama Lengkap" className="input-style" />
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
                    <select name="role" value={formData.role} onChange={handleChange} className="input-style">
                      <option value="USER">USER / KARYAWAN</option>
                      <option value="ADMIN">ADMIN HRD</option>
                      <option value="MANAGER">MANAGER</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <button type="submit" className={`flex-1 ${formData.id ? 'bg-amber-600' : 'bg-cyan-700'} text-white font-bold py-4 rounded-2xl shadow-lg transition-all`}>
                      {formData.id ? "Update Data" : "Simpan User"}
                    </button>
                    {formData.id && (
                      <button type="button" onClick={resetForm} className="px-6 bg-slate-100 dark:bg-white/5 rounded-2xl font-bold">Batal</button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE SECTION */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Daftar User</h3>
                  {isLoading && <span className="text-cyan-500 animate-pulse text-xs font-bold">MEMUAT...</span>}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[10px] uppercase tracking-widest border-b dark:border-white/5">
                        <th className="px-6 py-4">Nama</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4 text-center">Role</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataUser.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all">
                          <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-100">{item.name || item.nama}</td>
                          <td className="px-6 py-5 text-sm text-slate-500">{item.email}</td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-[10px] font-black px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600">
                              {item.role}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right space-x-2">
                            <button onClick={() => openDetail(item)} className="text-blue-500 font-bold text-xs">Detail</button>
                            <button onClick={() => handleEdit(item)} className="text-amber-500 font-bold text-xs">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-rose-500 font-bold text-xs">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Detail (Tetap sama seperti desain Anda) */}
        {isModalOpen && selectedUser && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
              <div className="relative w-full max-w-md bg-white dark:bg-[#0f0f0f] rounded-[32px] p-8 shadow-2xl">
                 <h3 className="text-2xl font-bold mb-4">{selectedUser.name || selectedUser.nama}</h3>
                 <p className="text-slate-500 mb-6">Informasi detail akun pengguna dalam sistem.</p>
                 <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border dark:border-white/5">
                       <p className="text-[10px] uppercase font-bold text-slate-400">Email Address</p>
                       <p className="font-bold">{selectedUser.email}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border dark:border-white/5">
                       <p className="text-[10px] uppercase font-bold text-slate-400">System Role</p>
                       <p className="font-bold">{selectedUser.role}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-full mt-8 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl font-bold">Tutup Detail</button>
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