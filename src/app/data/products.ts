export type Category = 'RC World' | 'Smart Home' | 'Digital Tools' | 'Lifestyle Gear' | 'Creator Tools';

interface CategoryInfo {
    name: Category;
    icon: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    images?: string[];
    category: Category;
    description: string;
    features: string[];
    demoUrl?: string;
    marketplace: {
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

export const categoryInfo: CategoryInfo[] = [
    {
        name: 'RC World',
        icon: 'M12 6.75a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h6a2.25 2.25 0 002.25-2.25v-10.5z'
    },
    {
        name: 'Smart Home',
        icon: 'M4.5 7.5A1.5 1.5 0 016 6h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0118 18H6a1.5 1.5 0 01-1.5-1.5v-9z'
    },
    {
        name: 'Digital Tools',
        icon: 'M6 12a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 12v0a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 016 12v0z'
    },
    {
        name: 'Lifestyle Gear',
        icon: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z'
    },
    {
        name: 'Creator Tools',
        icon: 'M8.25 6.75h7.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
    }
];

export const categories: Category[] = categoryInfo.map(cat => cat.name);

export const products: Product[] = [
    {
        id: 1,
        name: "Paket Skincare Glowing",
        price: 500000,
        imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800",
        images: [
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800"
        ],
        category: "Lifestyle Gear",
        description: "Paket lengkap skincare untuk mencerahkan dan merawat kulit wajah Anda. Terdiri dari cleanser, toner, serum, moisturizer, dan sunscreen yang diformulasikan khusus untuk kulit Indonesia.",
        features: [
            "Bahan alami dan aman untuk semua jenis kulit",
            "Teruji dermatologis",
            "Hasil terlihat dalam 2 minggu",
            "Free konsultasi dengan beauty expert",
            "Garansi uang kembali 100%"
        ],
        marketplace: {
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
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800"
        ],
        category: "Creator Tools",
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
        category: "Creator Tools",
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
            tokopedia: "https://tokopedia.com/product/456"
        }
    },
    {
        id: 4,
        name: "Sepatu Sneakers Premium",
        price: 899000,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800",
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800"
        ],
        category: "Lifestyle Gear",
        description: "Sepatu sneakers premium dengan desain modern dan bahan berkualitas tinggi. Nyaman digunakan untuk aktivitas sehari-hari maupun berolahraga.",
        features: [
            "Bahan premium import",
            "Sol anti-slip",
            "Desain ergonomis",
            "Tersedia berbagai ukuran",
            "Garansi produk 6 bulan"
        ],
        marketplace: {
            tokopedia: "https://tokopedia.com/product/789",
            lazada: "https://lazada.co.id/product/789"
        }
    },
    {
        id: 5,
        name: "Tung Tung Tung Sahur Shirt",
        price: 450000,
        imageUrl: "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m8eirtsytpi637@resize_w500_nl.webp",
        images: [
            "https://down-id.img.susercontent.com/file/id-11134207-7rbk9-m8eirtsysaxqdd@resize_w500_nl.webp",
            "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m8eirtsyv42mf5@resize_w500_nl.webp",
            "https://images.unsplash.com/photo-1618354691551-44de113f0164?auto=format&fit=crop&w=800"
        ],
        category: "Lifestyle Gear",
        description: "Kemeja formal berkualitas tinggi dengan bahan premium dan jahitan rapi. Cocok untuk acara formal atau kantor.",
        features: [
            "Bahan katun premium",
            "Jahitan rapi dan kuat",
            "Anti kusut",
            "Tersedia berbagai ukuran",
            "Garansi penukaran size"
        ],
        marketplace: {
            tokopedia: "https://tokopedia.com/product/101",
            lazada: "https://lazada.co.id/product/101"
        }
    },
];
