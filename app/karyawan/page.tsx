"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

// Definisi Interface untuk Karyawan
interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  jabatan: string;
  status: string;
  tempatLahir: string;
  tglLahir: string;
  alamat: string;
  kantor: string;
}

export default function KaryawanPage() {
  // 1. State Utama Data Karyawan
  const [dataKaryawan, setDataKaryawan] = useState<Karyawan[]>([
    {
      id: 1,
      nik: "EMP001",
      nama: "Zaki Saifulloh",
      email: "zaki.saifulloh@company.com",
      jabatan: "Manager IT",
      status: "AKTIF",
      tempatLahir: "Bandung",
      tglLahir: "1990-05-15",
      alamat: "Jl. Merdeka No. 123",
      kantor: "Headquarters",
    },
  ]);

  // 2. State untuk Form
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    tempatLahir: "",
    tglLahir: "",
    alamat: "",
    jabatan: "Pilih Jabatan",
    status: "AKTIF",
    kantor: "Headquarters",
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOGIKA CRUD ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = () => {
    // Validasi Sederhana
    if (!form.nik || !form.nama || form.jabatan === "Pilih Jabatan") {
      alert("Harap isi NIK, Nama, dan Jabatan!");
      return;
    }

    if (editId) {
      // UPDATE
      setDataKaryawan(dataKaryawan.map((k) => (k.id === editId ? { ...form, id: editId } : k)));
      setEditId(null);
    } else {
      // CREATE
      const newKaryawan: Karyawan = {
        ...form,
        id: Date.now(),
      };
      setDataKaryawan([...dataKaryawan, newKaryawan]);
    }

    // Reset Form
    resetForm();
  };

  const resetForm = () => {
    setForm({
      nik: "",
      nama: "",
      email: "",
      tempatLahir: "",
      tglLahir: "",
      alamat: "",
      jabatan: "Pilih Jabatan",
      status: "AKTIF",
      kantor: "Headquarters",
    });
    setEditId(null);
  };

  const handleEdit = (k: Karyawan) => {
    setEditId(k.id);
    setForm({ ...k });
  };

  const handleHapus = (id: number) => {
    if (confirm("Yakin ingin menghapus karyawan ini?")) {
      setDataKaryawan(dataKaryawan.filter((k) => k.id !== id));
    }
  };

  const openDetail = (karyawan: Karyawan) => {
    setSelectedKaryawan(karyawan);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto relative">
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold italic tracking-tighter">
            Salary<span className="text-cyan-500">App</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">Management Karyawan</h2>
            <p className="text-slate-500 mt-2 text-lg">Manage employee records and information.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FORM SECTION */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 font-bold">
                    {editId ? "✎" : "+"}
                  </div>
                  <h3 className="text-xl font-bold">{editId ? "Ubah Karyawan" : "Tambah Karyawan"}</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">NIK</label>
                      <input name="nik" value={form.nik} onChange={handleInputChange} type="text" placeholder="NIK" className="input-style" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Nama</label>
                      <input name="nama" value={form.nama} onChange={handleInputChange} type="text" placeholder="Nama Lengkap" className="input-style" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Email</label>
                    <input name="email" value={form.email} onChange={handleInputChange} type="email" placeholder="email@company.com" className="input-style" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Tempat Lahir</label>
                      <input name="tempatLahir" value={form.tempatLahir} onChange={handleInputChange} type="text" placeholder="Kota" className="input-style" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Tanggal Lahir</label>
                      <input name="tglLahir" value={form.tglLahir} onChange={handleInputChange} type="date" className="input-style" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Alamat</label>
                    <textarea name="alamat" value={form.alamat} onChange={handleInputChange} placeholder="Alamat Lengkap" rows={2} className="input-style resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Jabatan</label>
                      <select name="jabatan" value={form.jabatan} onChange={handleInputChange} className="input-style appearance-none">
                        <option disabled>Pilih Jabatan</option>
                        <option>Manager IT</option>
                        <option>HR Specialist</option>
                        <option>Staff IT</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Status</label>
                      <select name="status" value={form.status} onChange={handleInputChange} className="input-style appearance-none">
                        <option value="AKTIF">AKTIF</option>
                        <option value="NON-AKTIF">NON-AKTIF</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button onClick={handleSimpan} className="flex-1 bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95">
                      {editId ? "Update Data" : "Simpan Karyawan"}
                    </button>
                    {editId && (
                      <button onClick={resetForm} className="px-6 bg-slate-100 dark:bg-white/10 font-bold rounded-2xl transition-all">Batal</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE SECTION */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Karyawan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataKaryawan.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Status</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataKaryawan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-100">{item.nama}</td>
                          <td className="px-6 py-6">
                            <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-500 dark:text-slate-400 uppercase">
                              {item.jabatan}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${item.status === 'AKTIF' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => openDetail(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                              <button onClick={() => handleHapus(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
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

        {/* MODAL DETAILED VIEW */}
        {isModalOpen && selectedKaryawan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-[480px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10">
              <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">✕</button>
                <h3 className="text-2xl font-bold text-white">{selectedKaryawan.nama}</h3>
                <p className="text-white/70 font-medium">{selectedKaryawan.jabatan}</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">NIK</p>
                    <p className="font-bold">{selectedKaryawan.nik}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                    <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">{selectedKaryawan.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Email</p>
                  <p className="text-sm font-medium p-3 bg-slate-50 dark:bg-white/5 rounded-xl">{selectedKaryawan.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">TTL</p>
                  <p className="text-sm font-bold">{selectedKaryawan.tempatLahir}, {selectedKaryawan.tglLahir}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Alamat</p>
                  <p className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl italic text-sm">"{selectedKaryawan.alamat}"</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 font-bold text-sm">Close Detail</button>
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
          padding: 0.75rem 1rem;
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
        }
      `}</style>
    </div>
  );
}