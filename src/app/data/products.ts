export type Category = 'Produk Kecantikan' | 'Pakaian' | 'Sepatu' | 'Produk Digital' | 'Jasa';

interface CategoryInfo {
    name: Category;
    icon: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: Category;
    description: string;
    features: string[];
    demoUrl?: string;
    marketplace: {
        shopee?: string;
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

export const categoryInfo: CategoryInfo[] = [
    {
        name: 'Produk Kecantikan',
        icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7m0 0h6M7 21v-4m0 0H3m18 0h-4'
    },
    {
        name: 'Pakaian',
        icon: 'M3 6l2-2h14l2 2M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6h18M9 3v18m6-18v18'
    },
    {
        name: 'Sepatu',
        icon: 'M21 15l-4-4-8 8-4-4m0 0l-4 4v-4h4z'
    },
    {
        name: 'Produk Digital',
        icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
        name: 'Jasa',
        icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    }
];

export const categories: Category[] = categoryInfo.map(cat => cat.name);

export const products: Product[] = [
    {
        id: 1,
        name: "Paket Skincare Glowing",
        price: 500000,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Produk Kecantikan",
        description: "Paket lengkap skincare untuk mencerahkan dan merawat kulit wajah Anda. Terdiri dari cleanser, toner, serum, moisturizer, dan sunscreen yang diformulasikan khusus untuk kulit Indonesia.",
        features: [
            "Bahan alami dan aman untuk semua jenis kulit",
            "Teruji dermatologis",
            "Hasil terlihat dalam 2 minggu",
            "Free konsultasi dengan beauty expert",
            "Garansi uang kembali 100%"
        ],
        marketplace: {
            shopee: "https://shopee.co.id/product/123",
            tokopedia: "https://tokopedia.com/product/123",
            lazada: "https://lazada.co.id/product/123",
            tiktokshop: "https://tiktok.com/shop/123"
        }
    },
    {
        id: 2,
        name: "Jasa Pembuatan Website",
        price: 2600000,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Jasa",
        description: "Layanan pembuatan website profesional dengan teknologi terkini. Kami menyediakan solusi website yang responsif, cepat, dan SEO-friendly untuk bisnis Anda.",
        features: [
            "Design modern dan responsif",
            "Optimasi SEO",
            "Integrasi media sosial",
            "Support teknis 24/7",
            "Garansi maintenance 1 tahun"
        ],
        demoUrl: "https://demo.jasaku.com/website",
        marketplace: {
            shopee: "https://shopee.co.id/product/456",
            tokopedia: "https://tokopedia.com/product/456"
        }
    },
    {
        id: 3,
        name: "Jasa Urut Keliling",
        price: 200000,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Jasa",
        description: "Layanan pijat profesional yang datang ke lokasi Anda. Terapis berpengalaman dan tersertifikasi akan membantu meredakan ketegangan otot dan memberikan relaksasi maksimal.",
        features: [
            "Terapis berpengalaman & tersertifikasi",
            "Peralatan pijat steril",
            "Bisa request terapis pria/wanita",
            "Tersedia berbagai jenis pijat",
            "Booking fleksibel 24 jam"
        ],
        demoUrl: "https://demo.jasaku.com/website",
        marketplace: {
            shopee: "https://shopee.co.id/product/456",
            tokopedia: "https://tokopedia.com/product/456"
        }
    }
];