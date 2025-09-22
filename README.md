# Tahsin App

## 📖 About the Project
**Tahsin App** adalah aplikasi berbasis multi-platform (web dan mobile) yang dirancang untuk membantu pengelolaan kegiatan pembelajaran *tahsin* (perbaikan bacaan Al-Qur’an).  
Aplikasi ini memudahkan administrasi dan manajemen kelas bagi lembaga, guru, maupun peserta, sehingga mereka dapat lebih fokus pada peningkatan kualitas bacaan.

Proyek ini terdiri dari tiga bagian utama:
- **Server API** – Backend berbasis [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) dengan [Prisma ORM](https://www.prisma.io/) untuk manajemen basis data.
- **Web Client** – Antarmuka berbasis browser untuk admin, guru, dan peserta. [Repositori Web Client](https://github.com/Arroziqi/tahsin-web.git)
- **Mobile Client** – Aplikasi mobile untuk Android/iOS yang memudahkan guru dan peserta memantau jadwal dan progres. [Repositori Mobile Client](https://github.com/Arroziqi/tahsin-mobile.git)

---

## 🚀 Fitur Utama
- **Manajemen Jadwal Kelas**  
  Membuat, memperbarui, dan memantau jadwal tahsin sesuai level, guru, dan kapasitas.
- **Manajemen Peserta**  
  Menambahkan, memperbarui, serta memantau data santri/peserta program tahsin.
- **Monitoring Perkembangan**  
  Melihat progres bacaan dan catatan evaluasi peserta.
- **Pengelolaan Guru / Ustadz**  
  Menyimpan data guru, mengatur jadwal mengajar, dan memantau kinerja.
- **Pengelolaan Level & Materi**  
  Menetapkan level bacaan, kurikulum, dan target capaian tiap tingkatan.
- **Pengumuman & Kalender Akademik**  
  Menyampaikan informasi penting dan jadwal kegiatan lembaga.
- **Administrasi & Pembayaran**  
  Mengelola tagihan, transaksi, serta laporan pembayaran.

---

## 🎯 Tujuan
Tahsin App bertujuan mendigitalisasi proses administrasi dan pembelajaran Al-Qur’an.  
Dengan sistem ini:
- Guru dapat fokus pada proses pengajaran tanpa direpotkan masalah administrasi manual.
- Peserta dapat memantau progres bacaan dan mengakses jadwal dengan mudah.
- Lembaga memperoleh data yang terstruktur dan laporan yang lebih akurat.

---

## 📁 Struktur Folder (Server API)

```

src
├── common          # Provider, helper, tipe umum, utilitas
│   ├── provider
│   ├── type
│   ├── utils
│   └── web.ts
├── controllers     # Layer penghubung request-response
├── exceptions      # Custom error & handler
├── middlewares     # Middleware auth, role, dsb
├── models          # Representasi entitas (Prisma)
├── routes          # Routing endpoint per modul
├── schemas         # Validasi schema request body/query
├── services        # Business logic & komunikasi ke model
├── type            # Tipe khusus request/response
└── index.ts        # Entry point aplikasi

prisma
├── migrations      # File migrasi database
├── schema.prisma   # Definisi model Prisma
└── seed\*.ts        # Script seed data

```

> Struktur lengkap dengan seluruh file bisa dilihat di [bagian sebelumnya dari dokumen ini](#).

---

## 🛠️ Teknologi yang Digunakan
- **Backend**: Node.js, Express.js, Prisma ORM, TypeScript  
- **Frontend Web**: React, Tailwind CSS  
- **Mobile**: React Native  
- **Database**: PostgreSQL/MySQL (tergantung konfigurasi)  
- **Autentikasi**: JSON Web Token (JWT)  
- **Validasi**: Zod/Yup

---

## 🌐 Repositori Terkait
- [Tahsin App – Server API](https://github.com/username/tahsin-app-server) ← repositori saat ini  
- [Tahsin App – Web Client](https://github.com/Arroziqi/tahsin-web.git)  
- [Tahsin App – Mobile Client](https://github.com/Arroziqi/tahsin-mobile.git)

---

## 📌 Dokumentasi API
Dokumentasi endpoint untuk Server API tersedia di Postman:  
👉 [https://documenter.getpostman.com/view/39133117/2sB3HtGH9W](https://documenter.getpostman.com/view/39133117/2sB3HtGH9W)

---

## 🧱 Arsitektur Singkat
Tahsin App mengadopsi arsitektur **MVC + Service Layer**:
- **Router** → menangani mapping endpoint ke controller.
- **Controller** → menerima request, memproses respons, dan memanggil service.
- **Service** → berisi business logic utama.
- **Model (Prisma)** → komunikasi dengan database.
- **Middleware** → validasi, autentikasi, otorisasi, dsb.

---

## 🏁 Getting Started

> Pastikan **Node.js** dan **npm / pnpm / yarn** sudah terinstal di mesin kamu.

1. **Clone repository**
   ```bash
   git clone https://github.com/username/tahsin-app-server.git
   cd tahsin-app-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Setup environment**

  * Duplikat file `.env.example` menjadi `.env`
  * Isi variabel sesuai kebutuhan, contoh:

    ```env
    PORT=5000
    DATABASE_URL="postgresql://postgres:password@localhost:5432/tahsin_app?schema=public"
    DEFAULT_PW_USER=Pass1234
    ```

4. **Migrasi database**

   ```bash
   npx prisma migrate dev
   ```

5. **Seed data (opsional)**

   ```bash
   npx ts-node prisma/seed.ts
   ```

6. **Jalankan server**

   ```bash
   npm run dev
   ```

   Server akan berjalan di `http://localhost:3000` (atau port sesuai konfigurasi).

## 📄 Lisensi
Proyek ini dirilis di bawah lisensi **MIT**.  
Lihat file [LICENSE](LICENSE) untuk detail.