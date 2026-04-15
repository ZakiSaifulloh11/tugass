"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function KonfigurasiPage() {
  const [dataConfig, setDataConfig] = useState([
    { id: 1, tahun: "2024", jatahCuti: 12, nilaiUang: 150000, status: "AKTIF" },
    { id: 2, tahun: "2025", jatahCuti: 14, nilaiUang: 200000, status: "NON-AKTIF" },
  ]);

  const [formData, setFormData] = useState({
    id: null as number | null,
    tahun: "",
    jatahCuti: "",
    nilaiUang: "",
    status: "Aktif"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tahun || !formData.jatahCuti || !formData.nilaiUang) return alert("Isi semua data!");

    if (formData.id) {
      setDataConfig(dataConfig.map(item => 
        item.id === formData.id ? { ...item, tahun: formData.tahun, jatahCuti: Number(formData.jatahCuti), nilaiUang: Number(formData.nilaiUang), status: formData.status.toUpperCase() } : item
      ));
    } else {
      setDataConfig([...dataConfig, { id: Date.now(), tahun: formData.tahun, jatahCuti: Number(formData.jatahCuti), nilaiUang: Number(formData.nilaiUang), status: formData.status.toUpperCase() }]);
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus konfigurasi ini?")) {
      setDataConfig(dataConfig.filter(item => item.id !== id));
      if (formData.id === id) resetForm();
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      tahun: item.tahun,
      jatahCuti: item.jatahCuti.toString(),
      nilaiUang: item.nilaiUang.toString(),
      status: item.status === "AKTIF" ? "Aktif" : "Non-Aktif"
    });
  };

  const resetForm = () => {
    setFormData({ id: null, tahun: "", jatahCuti: "", nilaiUang: "", status: "Aktif" });
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">Konfigurasi</h1>
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
            <h2 className="text-4xl font-extrabold tracking-tight">Konfigurasi Tahun</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Setup jatah cuti dan nilai uang tahunan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{formData.id ? "Edit Konfigurasi" : "Tambah Konfigurasi"}</h3>
                  {formData.id && (
                    <button type="button" onClick={resetForm} className="text-xs text-rose-500 font-bold hover:underline">Batal</button>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Tahun</label>
                    <input name="tahun" value={formData.tahun} onChange={handleChange} type="text" placeholder="2024" className="input-style" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Jatah Cuti Tahunan</label>
                    <div className="relative">
                      <input name="jatahCuti" value={formData.jatahCuti} onChange={handleChange} type="number" placeholder="12" className="input-style pr-16" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Hari</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Nilai Uang (Rp)</label>
                    <input name="nilaiUang" value={formData.nilaiUang} onChange={handleChange} type="number" placeholder="150000" className="input-style" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="input-style appearance-none">
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                  
                  <button type="submit" className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95 ${formData.id ? 'bg-amber-600' : 'bg-[#005a8d]'} text-white`}>
                    {formData.id ? "Simpan Perubahan" : "Simpan Data"}
                  </button>
                </div>
              </form>
            </div>

            {/* Table Section */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <h3 className="text-xl font-bold">Data Konfigurasi</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataConfig.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Tahun</th>
                        <th className="px-6 py-6 font-bold">Cuti</th>
                        <th className="px-6 py-6 font-bold">Nilai Uang</th>
                        <th className="px-6 py-6 font-bold text-center">Status</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataConfig.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-6 font-black text-lg">{item.tahun}</td>
                          <td className="px-6 py-6 font-medium text-slate-600 dark:text-slate-300">{item.jatahCuti} Hari</td>
                          {/* PERBAIKAN DI SINI: Menampilkan Nilai Uang dengan format Rupiah */}
                          <td className="px-6 py-6 font-bold text-emerald-600 dark:text-emerald-400">
                            Rp {item.nilaiUang.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-6 text-center">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${item.status === 'AKTIF' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
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