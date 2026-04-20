"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import axios from "axios";

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: string | number;
  status_aktif: boolean;
}

const API_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

export default function KaryawanPage() {
  const [dataKaryawan, setDataKaryawan] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    id_jabatan: "1",
    status_aktif: true,
  });

  // Fungsi untuk mendapatkan konfigurasi Header (Token)
  const getAuthConfig = () => {
    const token = localStorage.getItem("access_token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
  };

  // --- READ ---
  const fetchKaryawan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, getAuthConfig());
      const result = response.data.data || response.data;
      setDataKaryawan(Array.isArray(result) ? result : []);
    } catch (error: any) {
      console.error("Fetch Error:", error.response?.data);
      if (error.response?.status === 401) alert("Sesi kadaluarsa, silakan login kembali.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  // --- CREATE & UPDATE ---
  const handleSimpan = async () => {
    if (!form.nik || !form.nama) return alert("NIK dan Nama wajib diisi!");

    const payload = {
      ...form,
      status_aktif: String(form.status_aktif) === "true",
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload, getAuthConfig());
        alert("Data diperbarui!");
      } else {
        await axios.post(API_URL, payload, getAuthConfig());
        alert("Data ditambahkan!");
      }
      resetForm();
      fetchKaryawan();
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal menyimpan data.");
    }
  };

  // --- DELETE ---
  const handleHapus = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      fetchKaryawan();
    } catch (error) {
      alert("Gagal menghapus.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (k: Karyawan) => {
    setEditId(k.id);
    setForm({
      nik: k.nik,
      nama: k.nama,
      email: k.email,
      tempat_lahir: k.tempat_lahir,
      tanggal_lahir: k.tanggal_lahir,
      alamat: k.alamat,
      id_jabatan: String(k.id_jabatan),
      status_aktif: k.status_aktif,
    });
  };

  const resetForm = () => {
    setForm({
      nik: "", nama: "", email: "", tempat_lahir: "",
      tanggal_lahir: "", alamat: "", id_jabatan: "1", status_aktif: true,
    });
    setEditId(null);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold italic">Salary<span className="text-cyan-500">App</span></h1>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0f0f0f] p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl">
              <h3 className="text-xl font-bold mb-6">{editId ? "Ubah Karyawan" : "Tambah Karyawan"}</h3>
              <div className="space-y-4">
                <input name="nik" value={form.nik} onChange={handleInputChange} placeholder="NIK" className="input-style" />
                <input name="nama" value={form.nama} onChange={handleInputChange} placeholder="Nama Lengkap" className="input-style" />
                <input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" className="input-style" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="tempat_lahir" value={form.tempat_lahir} onChange={handleInputChange} placeholder="Tempat Lahir" className="input-style" />
                  <input name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleInputChange} type="date" className="input-style" />
                </div>
                <textarea name="alamat" value={form.alamat} onChange={handleInputChange} placeholder="Alamat" className="input-style" />
                <div className="grid grid-cols-2 gap-4">
                  <select name="id_jabatan" value={form.id_jabatan} onChange={handleInputChange} className="input-style">
                    <option value="1">Manager IT</option>
                    <option value="2">Staff IT</option>
                  </select>
                  <select name="status_aktif" value={String(form.status_aktif)} onChange={handleInputChange} className="input-style">
                    <option value="true">AKTIF</option>
                    <option value="false">NON-AKTIF</option>
                  </select>
                </div>
                <button onClick={handleSimpan} className="w-full bg-[#005a8d] text-white font-bold py-4 rounded-2xl hover:bg-cyan-600 transition-all">
                  {editId ? "Update Data" : "Simpan Karyawan"}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0f0f0f] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-white/5 font-bold">Data Karyawan</div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-10 text-center">Loading...</div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-transparent text-xs uppercase text-slate-400">
                      <tr>
                        <th className="px-6 py-4">Nama</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataKaryawan.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                          <td className="px-6 py-4 font-medium">{item.nama}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.status_aktif ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                              {item.status_aktif ? "AKTIF" : "NON-AKTIF"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => handleEdit(item)} className="text-orange-500 text-sm">Edit</button>
                            <button onClick={() => handleHapus(item.id)} className="text-rose-500 text-sm">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          background: transparent;
          outline: none;
        }
        :global(.dark) .input-style { border-color: #334155; color: white; }
        .input-style:focus { border-color: #06b6d4; }
      `}</style>
    </div>
  );
}