# Navbar Components Structure

Folder `navbar/` berisi semua komponen yang berkaitan dengan navigasi aplikasi.

## Komponen yang Tersedia:

- **`Navbar.tsx`** - Komponen utama navbar dengan scroll behavior
- **`Logo.tsx`** - Komponen logo yang dapat digunakan kembali
- **`SearchButton.tsx`** - Tombol pencarian dengan animasi hover
- **`SearchModal.tsx`** - Modal pencarian lengkap dengan animasi
- **`NavigationDropdown.tsx`** - Menu dropdown dengan animasi
- **`NavbarAnimations.ts`** - Konstanta animasi untuk semua komponen navbar

## Struktur File:
```
navbar/
├── index.ts              # Export semua komponen
├── Navbar.tsx           # Main navbar component
├── NavbarAnimations.ts   # Animation constants
├── Logo.tsx             # Logo component
├── SearchButton.tsx     # Search button component
├── SearchModal.tsx      # Search modal component
└── NavigationDropdown.tsx # Navigation dropdown component
```

## Penggunaan:
```tsx
import { Navbar, Logo, SearchButton } from '../components/navbar';
// atau
import Navbar from '../components/navbar/Navbar';
```
