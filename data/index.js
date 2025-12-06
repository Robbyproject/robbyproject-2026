export const BOT_DATA = {
    quotes: [
        "Hidup itu seperti pixel, kecil tapi berarti.",
        "Jangan lupa titik koma ; kalau gamau error.",
        "Mending rakit PC daripada rakit harapan.",
        "Error 404: Jodoh not found.",
        "Kopi adalah bahan bakar koding."
    ],
    images: ["/design1.webp", "/design2.webp", "/design3.webp", "/design4.webp", "/design5.webp"],
    gifs: ["/Mowe.gif"],
    pricelist: "💰 **PRICELIST DESIGN** 💰\n\n• Poster Sport: Rp 50.000\n• Banner Youtube: Rp 75.000\n• Full Branding: Rp 150.000\n• Ilustrasi: Mulai Rp 100.000",
    payment: "💳 **METODE PEMBAYARAN** 💳\n\n• DANA: 0812-xxxx-xxxx\n• QRIS: [Scan Barcode di Profil]\n• Bank Jago: 1029-xxxx-xxxx",
    menu: "🤖 **MENU MIKOO BOT** 🤖\n\nKetik perintah dibawah:\n👉 -Pricelist\n👉 -gambar\n👉 -kata kata lucu\n👉 -Payment"
};

export const categories = [
    { name: "All" }, { name: "Sport" }, { name: "Illustration" },
    { name: "GFX" }, { name: "Poster" }, { name: "Website" }
];

// ... (kode atas tetap sama)

export const initialGallery = [
  { 
    id: 1, 
    category: "Sport", 
    title: "Paris Saint Germain", 
    description: "PSG Poster Design for matchday.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design1.webp",
    tech: ["Photoshop"] // <--- Tambahkan ini
  },
  { 
    id: 2, 
    category: "Sport", 
    title: "Liverpool FC", 
    description: "Liverpool Poster Design concept art.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design2.webp",
    tech: ["Photoshop"] 
  },
  { 
    id: 3, 
    category: "Sport", 
    title: "Kylian Mbappe", 
    description: "Kylian Mbappe Real Madrid Player introduction.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design3.webp",
    tech: ["Photoshop"] 
  },
  { 
    id: 4, 
    category: "Poster", 
    title: "HuoHuo", 
    description: "FanDesign HuoHuo From HSR.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design4.webp",
    tech: ["Photoshop"] 
  },
  { 
    id: 5, 
    category: "Poster", 
    title: "Acheron", 
    description: "FanDesign Acheron From HSR.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design5.webp",
    tech: ["Photoshop"] 
  },
  { 
    id: 6, 
    category: "Poster", 
    title: "Shorekeeper", 
    description: "FanDesign Shorekeeper From Wuthering Waves.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design6.webp",
    tech: ["Photoshop"] 
  },
  { 
    id: 7, 
    category: "Website", 
    title: "Photo Gallery", 
    description: "Website storage for football photos.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/project1.webp",
    tech: ["PHP","HTML", "CSS", "Javascript", "MySQL"] // <--- Sesuaikan
  },
  { 
    id: 8, 
    category: "Website", 
    title: "Restaurant Cashier", 
    description: "Cashier system with PHP and Database.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/project2.webp",
    tech: ["PHP","HTML", "CSS", "Javascript", "MySQL"] // <--- Sesuai Request
  },
  { 
    id: 9, 
    category: "Poster", 
    title: "Rani Maid ZZZ", 
    description: "Fanmade Poster.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Rani.jpg",
    tech: ["Photoshop"] // <--- Sesuai Request
  },
  { 
    id: 10, 
    category: "Poster", 
    title: "The Witcher 3 Wild Hunt", 
    description: "Fanmade Poster.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Witcher.jpg",
    tech: ["Photoshop"] // <--- Sesuai Request
  },
  { 
    id: 11, 
    category: "Poster", 
    title: "Pray For Sumatera", 
    description: "SGA Organization Post.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Sumatera.jpg",
    tech: ["Photoshop"] // <--- Sesuai Request
  },
  { 
    id: 12, 
    category: "Poster",  
    title: "Open Donation", 
    description: "SGA Organization Post.", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Poster-Donasi.jpg",
    tech: ["Photoshop"] // <--- Sesuai Request
  },
];