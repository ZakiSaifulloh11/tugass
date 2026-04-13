"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DivisiPage() {
  // 1. State untuk menyimpan data list divisi
  const [dataDivisi, setDataDivisi] = useState([
    { id: 1, nama: "INFORMATION TECHNOLOGY" },
    { id: 2, nama: "EDUCATION" },
    { id: 3, nama: "HRD" },
  ]);

  // 2. State untuk input form dan status edit
  const [inputNama, setInputNama] = useState("");
  const [editId, setEditId] = useState(null);

  // --- FUNGSI CRUD ---

  // Simpan (Tambah atau Update)
  const handleSimpan = () => {
    if (!inputNama.trim()) return alert("Nama divisi tidak boleh kosong!");

    if (editId) {
      // Logika Update
      setDataDivisi(dataDivisi.map(item => 
        item.id === editId ? { ...item, nama: inputNama.toUpperCase() } : item
      ));
      setEditId(null);
    } else {
      // Logika Create
      const newDivisi = {
        id: Date.now(), // Generate ID unik sementara
        nama: inputNama.toUpperCase(),
      };
      setDataDivisi([...dataDivisi, newDivisi]);
    }
    
    setInputNama(""); // Kosongkan input setelah simpan
  };

  // Persiapan Edit
const handleEdit = (item: any) => { // Tambahkan : any di sini
  if (!item) return;
  setEditId(item.id);
  setInputNama(item.nama);
};
// Hapus
  const handleHapus = (id: any) => {
    if (confirm("Apakah Anda yakin ingin menghapus divisi ini?")) {
      setDataDivisi(dataDivisi.filter((item: any) => item.id !== id));
    }
  };
  // Batal Edit
  const handleBatal = () => {
    setEditId(null);
    setInputNama("");
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">Divisi</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/10 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Management Divisi</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Configure and manage company departments.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Tambah/Edit Divisi */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl font-bold">
                    {editId ? "✎" : "+"}
                  </div>
                  <h3 className="text-xl font-bold">{editId ? "Ubah Divisi" : "Tambah Divisi"}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 ml-1">Nama Divisi</label>
                    <input 
                      type="text" 
                      value={inputNama}
                      onChange={(e) => setInputNama(e.target.value)}
                      placeholder="Contoh: IT Support"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSimpan}
                      className="flex-1 bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg shadow-cyan-900/10 transition-all"
                    >
                      {editId ? "Update Data" : "Simpan Divisi"}
                    </button>
                    {editId && (
                      <button 
                        onClick={handleBatal}
                        className="px-6 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabel Data Divisi */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Divisi</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataDivisi.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 dark:text-slate-500 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-8 py-6 font-bold">No</th>
                        <th className="px-8 py-6 font-bold">Nama Divisi</th>
                        <th className="px-8 py-6 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataDivisi.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-8 py-6 font-bold text-slate-400 dark:text-slate-500 w-16">{index + 1}</td>
                          <td className="px-8 py-6 font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">{item.nama}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button 
                                onClick={() => handleEdit(item)}
                                title="Edit" 
                                className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleHapus(item.id)}
                                title="Hapus" 
                                className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}