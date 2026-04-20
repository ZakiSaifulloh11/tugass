"use client";

import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";

// --- KONFIGURASI ENDPOINT ---
const API_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
const API_DIVISI_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";

export default function JabatanPage() {
  // 1. State Data
  const [dataJabatan, setDataJabatan] = useState<any[]>([]);
  const [dataDivisi, setDataDivisi] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  // 2. State Form
  const [form, setForm] = useState({
    jabatan: "",
    id_divisi: "",
    gaji_pokok: ""
  });
  const [editId, setEditId] = useState<number | null>(null);

  // --- HELPER: GET AUTH HEADERS ---
  // Fungsi ini mengambil token dari local storage seperti yang terlihat di gambar E.jpg
  const getHeaders = () => {
    const token = localStorage.getItem("access_token"); 
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    };
  };

  // --- FUNGSI AMBIL DATA (READ) ---
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch Data Jabatan
      const resJabatan = await fetch(API_URL, { headers: getHeaders() });
      const jsonJabatan = await resJabatan.json();
      
      // Fetch Data Divisi untuk Dropdown
      const resDivisi = await fetch(API_DIVISI_URL, { headers: getHeaders() });
      const jsonDivisi = await resDivisi.json();

      setDataJabatan(Array.isArray(jsonJabatan) ? jsonJabatan : jsonJabatan.data || []);
      setDataDivisi(Array.isArray(jsonDivisi) ? jsonDivisi : jsonDivisi.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- HANDLER FUNCTIONS ---

  const handleSimpan = async () => {
    if (!form.jabatan || !form.id_divisi || !form.gaji_pokok) {
      return alert("Mohon lengkapi semua data!");
    }

    const payload = {
      jabatan: form.jabatan.toUpperCase(),
      id_divisi: parseInt(form.id_divisi),
      gaji_pokok: parseInt(form.gaji_pokok)
    };

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const response = await fetch(url, {
        method: method,
        headers: getHeaders(), // Mengirim token agar tidak Error 401
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(editId ? "Data diperbarui!" : "Data disimpan!");
        setForm({ jabatan: "", id_divisi: "", gaji_pokok: "" });
        setEditId(null);
        fetchData(); 
      } else {
        const errData = await response.json();
        alert(errData.message || "Gagal menyimpan data ke API.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  const handleHapus = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus jabatan ini?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { 
          method: "DELETE",
          headers: getHeaders()
        });
        if (response.ok) {
          fetchData();
        } else {
          alert("Gagal menghapus data.");
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus.");
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setForm({
      jabatan: item.jabatan,
      id_divisi: item.id_divisi.toString(),
      gaji_pokok: item.gaji_pokok.toString()
    });
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">Jabatan</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">Management Jabatan</h2>
            <p className="text-slate-500 mt-2 text-lg italic">Konfigurasi struktur posisi dan gaji pokok karyawan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- FORM SECTION --- */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                   <span className="text-cyan-500">{editId ? "✎" : "+"}</span>
                   {editId ? "Ubah Jabatan" : "Tambah Jabatan"}
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Nama Jabatan</label>
                    <input 
                      type="text" 
                      value={form.jabatan}
                      onChange={(e) => setForm({...form, jabatan: e.target.value})}
                      placeholder="Contoh: MANAGER IT"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-semibold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Divisi</label>
                    <select 
                      value={form.id_divisi}
                      onChange={(e) => setForm({...form, id_divisi: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer font-semibold"
                    >
                      <option value="">Pilih Divisi</option>
                      {dataDivisi.map((div) => (
                        <option key={div.id} value={div.id}>{div.nama_divisi || div.divisi}</option>
                      ))}
                      {/* Manual fallback jika data divisi kosong */}
                      {dataDivisi.length === 0 && (
                        <>
                          <option value="1">INFORMATION TECHNOLOGY</option>
                          <option value="2">HRD</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                      <input 
                        type="number" 
                        value={form.gaji_pokok}
                        onChange={(e) => setForm({...form, gaji_pokok: e.target.value})}
                        placeholder="0"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-semibold"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={handleSimpan}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                    >
                      {editId ? "Update Data" : "Simpan Jabatan"}
                    </button>
                    {editId && (
                      <button 
                        onClick={() => {setEditId(null); setForm({jabatan: "", id_divisi: "", gaji_pokok: ""});}}
                        className="px-6 bg-slate-100 dark:bg-white/10 font-bold rounded-2xl"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Daftar Data Jabatan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    {isLoading ? "Memuat..." : `${dataJabatan.length} Total Data`}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold text-center">ID Divisi</th>
                        <th className="px-6 py-6 font-bold">Gaji Pokok</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {isLoading ? (
                        <tr><td colSpan={5} className="text-center py-10 animate-pulse text-slate-400">Sedang memproses data...</td></tr>
                      ) : dataJabatan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all">
                          <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-6 font-bold uppercase">{item.jabatan}</td>
                          <td className="px-6 py-6 text-center font-bold text-cyan-600">{item.id_divisi}</td>
                          <td className="px-6 py-6 font-bold text-emerald-600 dark:text-emerald-400">
                            {formatRupiah(item.gaji_pokok)}
                          </td>
                          <td className="px-6 py-6 pr-8 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button onClick={() => handleHapus(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
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
      </div>
    </div>
  );
}