"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function JabatanPage() {
  // 1. State Utama Data Jabatan
  const [dataJabatan, setDataJabatan] = useState([
    { id: 1, jabatan: "STAFF", divisi: "INFORMATION TECHNOLOGY", gaji: 3000000 },
    { id: 2, jabatan: "HEAD OF", divisi: "HRD", gaji: 5000000 },
  ]);

  // 2. State Form
  const [form, setForm] = useState({
    jabatan: "",
    divisi: "Pilih Divisi",
    gaji: ""
  });
  const [editId, setEditId] = useState(null);

  // --- HANDLER FUNCTIONS ---

  // Fungsi Simpan (Tambah & Update)
  const handleSimpan = () => {
    if (!form.jabatan || form.divisi === "Pilih Divisi" || !form.gaji) {
      return alert("Mohon lengkapi semua data!");
    }

    if (editId) {
      // Logika Update
      const updated = dataJabatan.map(item => 
        item.id === editId ? { ...item, ...form, jabatan: form.jabatan.toUpperCase(), gaji: Number(form.gaji) } : item
      );
      setDataJabatan(updated);
      setEditId(null);
    } else {
      // Logika Create
      const newJabatan = {
        id: Date.now(),
        jabatan: form.jabatan.toUpperCase(),
        divisi: form.divisi,
        gaji: Number(form.gaji)
      };
      setDataJabatan([...dataJabatan, newJabatan]);
    }

    setForm({ jabatan: "", divisi: "Pilih Divisi", gaji: "" }); // Reset form
  };

  // Fungsi Hapus
  const handleHapus = (id: any) => {
    if (window.confirm("Yakin ingin menghapus jabatan ini?")) {
      setDataJabatan(dataJabatan.filter(item => item.id !== id));
    }
  };

// Cara Cepat (Garis merah langsung hilang)
const handleEdit = (item: any) => {
  setEditId(item.id);
  setForm({
    jabatan: item.jabatan,
    divisi: item.divisi,
    gaji: item.gaji
  });
};

  // Helper Format Rupiah
  const formatRupiah = (value : number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">Jabatan</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">Management Jabatan</h2>
            <p className="text-slate-500 mt-2 text-lg">Configure positions and salary structures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* FORM SECTION */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 font-bold">
                    {editId ? "✎" : "+"}
                  </div>
                  <h3 className="text-xl font-bold">{editId ? "Ubah Jabatan" : "Tambah Jabatan"}</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Nama Jabatan</label>
                    <input 
                      type="text" 
                      value={form.jabatan}
                      onChange={(e) => setForm({...form, jabatan: e.target.value})}
                      placeholder="Contoh: Manager IT"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Pilih Divisi</label>
                    <select 
                      value={form.divisi}
                      onChange={(e) => setForm({...form, divisi: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
                    >
                      <option disabled>Pilih Divisi</option>
                      <option>INFORMATION TECHNOLOGY</option>
                      <option>EDUCATION</option>
                      <option>HRD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                      <input 
                        type="number" 
                        value={form.gaji}
                        onChange={(e) => setForm({...form, gaji: e.target.value})}
                        placeholder="0"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-5 py-3.5 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={handleSimpan}
                      className="flex-1 bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                    >
                      {editId ? "Update Data" : "Simpan Jabatan"}
                    </button>
                    {editId && (
                      <button 
                        onClick={() => {setEditId(null); setForm({jabatan: "", divisi: "Pilih Divisi", gaji: ""});}}
                        className="px-6 bg-slate-100 dark:bg-white/10 font-bold rounded-2xl transition-all"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE SECTION */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Jabatan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataJabatan.length} Total Posisi
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Divisi</th>
                        <th className="px-6 py-6 font-bold">Gaji Pokok</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataJabatan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all">
                          <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-200 uppercase">{item.jabatan}</td>
                          <td className="px-6 py-6">
                            <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-500 uppercase">
                              {item.divisi}
                            </span>
                          </td>
                          <td className="px-6 py-6 font-bold text-emerald-600 dark:text-emerald-400">
                            {formatRupiah(item.gaji)}
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
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