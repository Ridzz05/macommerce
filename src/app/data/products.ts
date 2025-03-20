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
        icon: 'M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
    },
    {
        name: 'Pakaian',
        icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
    },
    {
        name: 'Sepatu',
        icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
    },
    {
        name: 'Produk Digital',
        icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
    },
    {
        name: 'Jasa',
        icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
    }
];

export const categories: Category[] = categoryInfo.map(cat => cat.name);

export const products: Product[] = [
    {
        id: 1,
        name: "Paket Skincare Glowing",
        price: 500000,
        imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800",
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
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800",
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
            tokopedia: "https://tokopedia.com/product/456",
            lazada: "https://lazada.co.id/product/456",
            tiktokshop: "https://tiktok.com/shop/456"
        }
    },
    {
        id: 3,
        name: "Jasa Pembuatan Website",
        price: 2600000,
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800",
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
        id: 4,
        name: "Sepatu Sneakers Premium",
        price: 899000,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800",
        category: "Sepatu",
        description: "Sepatu sneakers premium dengan desain modern dan bahan berkualitas tinggi. Nyaman digunakan untuk aktivitas sehari-hari maupun berolahraga.",
        features: [
            "Bahan premium import",
            "Sol anti-slip",
            "Desain ergonomis",
            "Tersedia berbagai ukuran",
            "Garansi produk 6 bulan"
        ],
        marketplace: {
            shopee: "https://shopee.co.id/product/789",
            tokopedia: "https://tokopedia.com/product/789",
            lazada: "https://lazada.co.id/product/789"
        }
    },
    {
        id: 5,
        name: "Kemeja Formal Premium",
        price: 450000,
        imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=800",
        category: "Pakaian",
        description: "Kemeja formal berkualitas tinggi dengan bahan premium dan jahitan rapi. Cocok untuk acara formal atau kantor.",
        features: [
            "Bahan katun premium",
            "Jahitan rapi dan kuat",
            "Anti kusut",
            "Tersedia berbagai ukuran",
            "Garansi penukaran size"
        ],
        marketplace: {
            shopee: "https://shopee.co.id/product/101",
            tokopedia: "https://tokopedia.com/product/101",
            lazada: "https://lazada.co.id/product/101"
        }
    },
    {
        id: 6,
        name: "Template Website Premium",
        price: 750000,
        imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=800",
        category: "Produk Digital",
        description: "Template website premium dengan desain modern dan responsif. Cocok untuk berbagai jenis bisnis dan mudah dikustomisasi.",
        features: [
            "Desain responsif",
            "SEO friendly",
            "Mudah dikustomisasi",
            "Update seumur hidup",
            "Dokumentasi lengkap"
        ],
        demoUrl: "https://demo.jasaku.com/template",
        marketplace: {
            tokopedia: "https://tokopedia.com/product/202",
            tiktokshop: "https://tiktok.com/shop/202",
            shopee: "https://shopee.co.id/product/202"
        }
    },
    {
        id: 7,
        name: "Template Website Premium",
        price: 750000,
        imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=800",
        category: "Produk Digital",
        description: "Template website premium dengan desain modern dan responsif. Cocok untuk berbagai jenis bisnis dan mudah dikustomisasi.",
        features: [
            "Desain responsif",
            "SEO friendly",
            "Mudah dikustomisasi",
            "Update seumur hidup",
            "Dokumentasi lengkap"
        ],
        demoUrl: "https://demo.jasaku.com/template",
        marketplace: {
            tokopedia: "https://tokopedia.com/product/202",
            tiktokshop: "https://tiktok.com/shop/202",
            shopee: "https://shopee.co.id/product/202"
        }
    },
    {
        id: 8,
        name: "Template Website Premium",
        price: 750000,
        imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=800",
        category: "Produk Digital",
        description: "Template website premium dengan desain modern dan responsif. Cocok untuk berbagai jenis bisnis dan mudah dikustomisasi.",
        features: [
            "Desain responsif",
            "SEO friendly",
            "Mudah dikustomisasi",
            "Update seumur hidup",
            "Dokumentasi lengkap"
        ],
        demoUrl: "https://demo.jasaku.com/template",
        marketplace: {
            tokopedia: "https://tokopedia.com/product/202",
            tiktokshop: "https://tiktok.com/shop/202",
            shopee: "https://shopee.co.id/product/202"
        }
    }

];