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
        icon: 'M9.75 13.5l3.75 3.75m0-4.5l-3.75 3.75M12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM12 21a9 9 0 100-18 9 9 0 000 18z'
    },
    {
        name: 'Pakaian',
        icon: 'M3 6.5v9.75A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 16.25V6.5m-19.5 0A2.25 2.25 0 013.75 4.5h16.5A2.25 2.25 0 0122.5 6.5m-19.5 0v1.5m19.5-1.5v1.5m-19.5 0h19.5'
    },
    {
        name: 'Sepatu',
        icon: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819'
    },
    {
        name: 'Produk Digital',
        icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
    },
    {
        name: 'Jasa',
        icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
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
            tokopedia: "https://tokopedia.com/product/456"
        }
    },
    {
        id: 3,
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
        id: 4,
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
        id: 5,
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
            tiktokshop: "https://tiktok.com/shop/202"
        }
    }
];