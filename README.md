# MaCommerce — Curated Discovery Platform

MaCommerce adalah platform discovery berbasis affiliate. Fokusnya **kurasi produk** (bukan marketplace tradisional): menampilkan rekomendasi singkat dan mengarahkan pengguna ke toko resmi atau TikTok Shop untuk transaksi.

---

## ✨ Key Features

- **Worlds & Kurasi** — produk dikelompokkan dalam world tematik untuk konteks yang jelas.
- **Filter & Search** — filter kategori + pencarian cepat via modal.
- **Product Detail** — deskripsi, fitur, dan link marketplace (Tokopedia, Lazada, TikTok Shop).
- **Admin Dashboard** — overview metric, form input produk, preview, dan tabel manajemen.
- **SEO Ready** — metadata lengkap, sitemap, robots, dan OpenGraph/Twitter preview.
- **Brand Assets** — favicon & OG image sudah pakai logo MaCommerce.

---

## 🧱 Tech Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Vercel KV (Upstash Redis)
- Lucide Icons
- Vercel Speed Insights

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

### Environment Variables
Buat `.env.local` dengan variabel berikut:

```
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
KV_URL=
REDIS_URL=
ADMIN_PASSWORD=
```

> `ADMIN_PASSWORD` digunakan untuk login admin.

---

## 🔗 Routes

- `/` — Homepage (kurasi + grid produk)
- `/about` — Tentang MaCommerce
- `/product/[slug]` — Detail produk
- `/admin/login` — Login admin
- `/admin/products` — Dashboard admin (manajemen produk)

---

## ✅ SEO & Verification

- Sitemap tersedia di `https://macommerce.shop/sitemap.xml`
- File verifikasi Google Search Console disimpan di `public/google479e96830e6cfdaf.html`

---

## 🌐 Live

https://macommerce.shop