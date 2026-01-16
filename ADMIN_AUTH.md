# Admin Authentication Setup

## 📋 Overview
Sistem autentikasi untuk melindungi halaman admin `/admin/products/` dengan password protection.

## 🔐 Cara Kerja

### Komponen Utama:
1. **AuthContext** (`src/app/context/AuthContext.tsx`) - State management untuk auth
2. **AdminProtectedRoute** (`src/app/components/AdminProtectedRoute.tsx`) - Component wrapper untuk halaman admin
3. **API Routes**:
   - `POST /api/auth/login` - Login endpoint
   - `GET /api/auth/check` - Check auth status
   - `POST /api/auth/logout` - Logout endpoint
4. **Login Page** (`src/app/admin/login/page.tsx`) - Form login admin

## 🚀 Setup & Configuration

### 1. Set Admin Password
Edit `.env.local`:
```bash
ADMIN_PASSWORD=your_secure_password_here
```

**⚠️ Production Tip**: Gunakan password yang kuat dan jangan commit ke repository!

### 2. Akses Halaman Admin
- **URL**: `http://localhost:3000/admin/login`
- **Password**: Sesuai dengan `ADMIN_PASSWORD` di `.env.local`

## 🔄 Flow Diagram

```
User mengakses /admin/products/
         ↓
AdminProtectedRoute check auth status
         ↓
    Authenticated?
         ↓
    Yes → Tampilkan halaman
    No  → Redirect ke /admin/login
         ↓
User masukkan password
         ↓
POST /api/auth/login
         ↓
Password valid?
    Yes → Set cookie + Redirect ke /admin/products
    No  → Tampilkan error message
```

## 🛠️ Usage

### Protected Route di Component:
```tsx
import { AdminProtectedRoute } from '@/app/components/AdminProtectedRoute'

export default function AdminPage() {
  return (
    <AdminProtectedRoute>
      {/* Konten admin di sini */}
    </AdminProtectedRoute>
  )
}
```

### Menggunakan useAuth Hook:
```tsx
'use client'

import { useAuth } from '@/app/context/AuthContext'

export default function AdminComponent() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div>
      <p>Status: {isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## 📁 File Structure
```
src/app/
├── api/auth/
│   ├── login/route.ts       # POST login endpoint
│   ├── check/route.ts       # GET auth check endpoint
│   └── logout/route.ts      # POST logout endpoint
├── components/
│   └── AdminProtectedRoute.tsx  # Protected route wrapper
├── context/
│   └── AuthContext.tsx       # Auth state & functions
└── admin/
    ├── login/
    │   └── page.tsx          # Login page
    └── products/
        └── page.tsx          # Protected products admin page
```

## 🔑 Session Management

- **Cookie**: `admin_token` (httpOnly, secure, 24-hour expiry)
- **Storage**: In-memory (untuk development)
- **Production**: Pertimbangkan menggunakan database/Redis untuk persistent sessions

## 🚨 Security Notes

### Development:
- Password disimpan di `.env.local`
- Session disimpan in-memory

### Production:
1. **Gunakan environment variable** yang aman untuk password
2. **Implementasikan proper session storage** (Redis, Database)
3. **Tambahkan rate limiting** pada endpoint login
4. **Gunakan HTTPS** (otomatis di Vercel)
5. **Pertimbangkan 2FA** untuk admin

## 🧪 Testing

### Test Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'
```

### Test Check Auth:
```bash
curl http://localhost:3000/api/auth/check
```

## 📝 Environment Variables

```env
# Required for Admin Auth
ADMIN_PASSWORD=your_secure_password

# Optional: For Vercel KV (if using database)
KV_REST_API_URL=https://your-kv-id.kv.vercel.sh
KV_REST_API_TOKEN=your_token
```

## ⚡ Next Steps

1. ✅ Admin auth sudah setup
2. 🔜 Tambahkan user management (multiple admins)
3. 🔜 Implementasikan 2FA
4. 🔜 Tambahkan audit logging
5. 🔜 Setup persistent session storage

---

**Last Updated**: January 16, 2026
