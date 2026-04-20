"use client";

import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { LayoutGrid, Plus, Pencil, Trash2, X, Loader2, Save } from "lucide-react";

const API_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";

export default function DivisiPage() {
  // 1. State Data & UI
  const [dataDivisi, setDataDivisi] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. State Form
  const [inputDivisi, setInputDivisi] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // --- HELPER: Ambil Header dengan Token ---
  const getAuthHeader = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  };

  // --- CRUD FUNCTIONS ---

  // [READ] Ambil Data dari API
  const fetchDivisi = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeader(),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setDataDivisi(Array.isArray(result) ? result : result.data || []);
      } else {
        throw new Error(result.message || "Gagal mengambil data");
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDivisi();
  }, [fetchDivisi]);

  // [CREATE & UPDATE] Simpan Data
  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!inputDivisi.trim()) return alert("Nama divisi wajib diisi!");

    try {
      setIsSubmitting(true);
      
      // LOGIKA EDIT: Jika ada editId maka ke URL /id, jika tidak ke base URL
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: getAuthHeader(),
        body: JSON.stringify({ divisi: inputDivisi.toUpperCase() }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(editId ? "Divisi berhasil diperbarui!" : "Divisi baru ditambahkan!");
        handleBatal(); // Reset form setelah berhasil
        fetchDivisi(); // Refresh tabel
      } else {
        alert(`Gagal menyimpan: ${result.message || "Cek kembali data Anda"}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // [DELETE] Hapus Data
  const handleHapus = async (id: number) => {
    if (!confirm("Hapus divisi ini secara permanen?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });

      if (response.ok) {
        alert("Divisi telah dihapus.");
        fetchDivisi();
        if (editId === id) handleBatal();
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (error) {
      alert("Koneksi bermasalah.");
    }
  };

  // [EDIT MODE] Persiapan Edit
  const handleEdit = (item: any) => {
    // Scroll ke atas agar user melihat form yang terisi
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditId(item.id);
    setInputDivisi(item.divisi);
  };

  // [CANCEL] Reset Form
  const handleBatal = () => {
    setEditId(null);
    setInputDivisi("");
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold italic tracking-tighter">
            INDO<span className="text-blue-500">PAY</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight uppercase">Admin</p>
              <p className="text-[10px] text-slate-500 italic">Payroll System</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <LayoutGrid className="text-blue-500" size={32} /> Management Divisi
            </h2>
            <p className="text-slate-500 mt-2 text-lg italic">Organisir struktur departemen Anda.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* FORM SECTION */}
            <div className="lg:col-span-4">
              <form 
                onSubmit={handleSimpan}
                className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl sticky top-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${editId ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {editId ? <Pencil size={20} /> : <Plus size={20} />}
                  </div>
                  <h3 className="text-xl font-bold">{editId ? "Ubah Divisi" : "Tambah Divisi"}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Nama Departemen
                    </label>
                    <input 
                      type="text" 
                      required
                      value={inputDivisi}
                      onChange={(e) => setInputDivisi(e.target.value)}
                      placeholder="Contoh: MARKETING"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold uppercase"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${editId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#005a8d] hover:bg-[#0077b6]'}`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <><Save size={18} /> {editId ? "Perbarui" : "Simpan"}</>
                      )}
                    </button>
                    {editId && (
                      <button 
                        type="button"
                        onClick={handleBatal}
                        className="px-6 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-bold rounded-2xl transition-all hover:bg-slate-200"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE SECTION */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Daftar Divisi</h3>
                  <span className="bg-blue-500/10 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-500/20">
                    ● {dataDivisi.length} Items
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-8 py-6 font-bold">No</th>
                        <th className="px-8 py-6 font-bold">Divisi</th>
                        <th className="px-8 py-6 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {isLoading ? (
                        <tr>
                          <td colSpan={3} className="px-8 py-20 text-center">
                            <div className="flex justify-center items-center gap-2 italic text-slate-400">
                              <Loader2 className="animate-spin text-blue-500" size={20} /> Memuat data...
                            </div>
                          </td>
                        </tr>
                      ) : dataDivisi.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-8 py-20 text-center text-slate-400 italic">
                            Database kosong.
                          </td>
                        </tr>
                      ) : (
                        dataDivisi.map((item, index) => (
                          <tr key={item.id} className={`group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all ${editId === item.id ? 'bg-orange-500/5' : ''}`}>
                            <td className="px-8 py-6 font-bold text-slate-400 w-20">{index + 1}</td>
                            <td className="px-8 py-6 font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                              {item.divisi}
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleEdit(item)}
                                  className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all"
                                  title="Edit"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => handleHapus(item.id)}
                                  className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all"
                                  title="Hapus"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}