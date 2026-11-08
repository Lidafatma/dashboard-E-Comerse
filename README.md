# 📊 Dashboard Admin — E-Commerce Olist

Dashboard admin interaktif untuk menganalisis data marketplace **Olist** (e-commerce Brasil). Dashboard ini merangkum performa penjualan, kategori produk, pembayaran, penjual, ulasan, dan pelanggan dalam satu tampilan yang bersih dan responsif.

🔗 **Live Demo:** [lidafatma.github.io/dashboard-E-Comerse](https://lidafatma.github.io/dashboard-E-Comerse/)

---

## 🖼️ Tampilan

>
> ```md
> ![Overview](./screenshots/overview.png)
> ```

---

## ✨ Fitur Utama

- **Overview** — ringkasan KPI utama dalam satu halaman.
- **Filter periode** — 3 bulan, 6 bulan, 12 bulan, atau semua data.
- **Top / Bottom 5 kategori** berdasarkan revenue (bar chart interaktif).
- **Seller states** — distribusi item terjual per negara bagian (donut chart).
- **Kartu KPI**:
  - Total revenue
  - Total transaksi
  - Pembayaran kartu kredit
  - Rata-rata skor review
- **Pencarian** kategori, negara bagian, dan metode pembayaran.
- **Mode gelap / terang** (dark mode toggle).
- **Notifikasi** dan profil pengguna.
- **Navigasi halaman**: Overview, Products, Payments, Sellers, Reviews, Customers, Settings.

---

## 📈 Ringkasan Insight (periode Mar – Agu 2018)

| Metrik | Nilai |
| --- | --- |
| Total revenue | R$ 5.827.634 |
| Total transaksi | 47.545 |
| Pembayaran kartu kredit | 32.372 (75,1% dari seluruh pembayaran) |
| Rata-rata review score | 4,08 / 5 |
| Review bintang 5 | 58,1% |
| Kategori teratas | *health beauty* (R$ 636.624) |
| Negara bagian penjual dominan | SP — 34.289 transaksi (72,1%) |

---

## 🗂️ Dataset

Dashboard menggunakan **[Brazilian E-Commerce Public Dataset by Olist](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)** dengan rentang data yang ditampilkan **Maret 2018 – Agustus 2018**.

Data yang dipakai mencakup: pesanan (orders), item pesanan, produk & kategori, pembayaran, penjual, pelanggan, dan ulasan.

---

## 🛠️ Teknologi

> ⚠️ Sesuaikan bagian ini dengan stack yang kamu pakai.

- HTML, CSS, JavaScript
- Library chart: *(contoh: Chart.js / ApexCharts / D3.js)*
- Hosting: GitHub Pages

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/lidafatma/dashboard-E-Comerse.git

# 2. Masuk ke folder proyek
cd dashboard-E-Comerse

# 3. Jalankan dengan server lokal (pilih salah satu)
npx serve .
# atau
python -m http.server 8000
```

Lalu buka `http://localhost:3000` (atau `http://localhost:8000`) di browser.

---

## 📁 Struktur Proyek
 
```
dashboard-E-Comerse/
├── .github/
│   └── workflows/
│       └── deploy.yml        # workflow deploy otomatis ke GitHub Pages
├── src/
│   ├── App.jsx               # komponen utama dashboard
│   ├── main.jsx              # entry point React
│   └── index.css             # style global & direktif Tailwind
├── index.html                # template HTML utama
├── package.json              # dependensi & script npm
├── package-lock.json
├── postcss.config.js         # konfigurasi PostCSS
├── tailwind.config.js        # konfigurasi Tailwind CSS
├── vite.config.js            # konfigurasi Vite
└── README.md
```
 
---

## 🌐 Deploy ke GitHub Pages

1. Push proyek ke repository GitHub.
2. Buka **Settings → Pages**.
3. Pada *Source*, pilih branch `main` dan folder `/ (root)`.
4. Simpan, lalu tunggu beberapa saat hingga situs aktif.

---

## 🔮 Rencana Pengembangan

- [ ] Halaman detail untuk Products, Payments, Sellers, Reviews, dan Customers
- [ ] Ekspor data ke CSV / PDF
- [ ] Filter tambahan (kategori, wilayah, metode pembayaran)
- [ ] Peningkatan aksesibilitas dan performa

---

## 👩‍💻 Author

**Maulida Fatma**
GitHub: [@lidafatma](https://github.com/lidafatma)

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan portofolio. Dataset © Olist, tersedia di bawah lisensi **CC BY-NC-SA 4.0** sesuai ketentuan di Kaggle.<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ef186778-5ca0-4470-b7f3-c0345fddfe23" />
