export interface TranslationKeys {
  // --- SIDEBAR ---
  nav_home: string;
  nav_about: string;
  nav_projects: string;
  nav_achievements: string;
  nav_contact: string;
  nav_waifu: string;
  nav_login: string;
  nav_anime: string;
  nav_services: string;
  nav_dashboard: string;

  // --- HERO SECTION ---
  hero_greeting: string;
  hero_based: string;
  hero_remote: string;
  hero_desc: string;
  hero_skills: string;
  hero_video: string;
  hero_skills_label: string;
  hero_skills_sub: string;
  hero_featured_highlight: string;
  hero_featured_sub: string;
  hero_sections_title: string;
  hero_sections_sub: string;
  hero_projects_title: string;
  hero_projects_built: string;
  hero_projects_desc: string;
  hero_about_title: string;
  hero_about_desc: string;
  hero_store_title: string;
  hero_store_assets: string;
  hero_store_premium: string;
  hero_ach_title: string;
  hero_ach_certs: string;
  hero_ach_milestones: string;
  hero_services_title: string;
  hero_services_desc: string;
  hero_services_graphic: string;
  hero_services_web: string;
  hero_services_uiux: string;
  hero_services_viewall: string;
  hero_dashboard_title: string;
  hero_dashboard_sub: string;
  hero_anime_title: string;
  hero_anime_watched: string;
  hero_waifu_title: string;
  hero_waifu_favorites: string;
  hero_waifu_favchar: string;
  hero_contact_title: string;
  hero_contact_sub: string;
  hero_contact_hello: string;
  hero_contact_hello_desc: string;
  hero_contact_inquiry: string;
  hero_contact_inquiry_desc: string;
  hero_contact_collab: string;
  hero_contact_collab_desc: string;
  hero_contact_email: string;
  hero_contact_email_desc: string;

  // --- WAIFU LIST ---
  waifu_title: string;
  waifu_subtitle: string;

  // --- CHARACTER 1: ALYA ---
  alya_name: string;
  alya_role: string;
  alya_desc: string;
  alya_job_label: string;
  alya_job_val: string;
  alya_origin_label: string;
  alya_origin_val: string;

  // --- CHARACTER 2: CASTORICE ---
  wife2_name: string;
  wife2_role: string;
  wife2_desc: string;
  wife2_job_label: string;
  wife2_job_val: string;
  wife2_origin_label: string;
  wife2_origin_val: string;

  // --- CHARACTER 3: SHOREKEEPER ---
  wife3_name: string;
  wife3_role: string;
  wife3_desc: string;
  wife3_job_label: string;
  wife3_job_val: string;
  wife3_origin_label: string;
  wife3_origin_val: string;

  // --- CHARACTER 4: KUCHIBA CHISA ---
  wife4_name: string;
  wife4_role: string;
  wife4_desc: string;
  wife4_job_label: string;
  wife4_job_val: string;
  wife4_origin_label: string;
  wife4_origin_val: string;

  // --- ABOUT PAGE ---
  about_title: string;
  about_subtitle: string;
  about_open_to_work: string;
  about_role: string;
  about_download_cv: string;
  about_biography: string;
  about_bio_1: string;
  about_bio_2: string;
  about_work_experience: string;
  about_no_experience: string;
  about_education: string;
  about_no_education: string;

  // --- PROJECTS ---
  proj_title: string;
  proj_subtitle: string;
  btn_view_project: string;

  // --- ACHIEVEMENTS ---
  ach_title: string;
  ach_subtitle: string;
  ach_search: string;
  btn_view_cred: string;

  // --- MUSIC ROOM ---
  music_title: string;
  music_subtitle: string;
  music_search: string;
  music_filter: string;

  // --- CONTACT PAGE ---
  contact_title: string;
  contact_subtitle: string;
  contact_socials: string;
  email_title: string;
  email_desc: string;
  btn_email: string;
  ig_title: string;
  ig_desc: string;
  btn_ig: string;
  li_title: string;
  li_desc: string;
  btn_li: string;
  wa_title: string;
  wa_desc: string;
  btn_wa: string;
  gh_title: string;
  gh_desc: string;
  btn_gh: string;
  be_title: string;
  be_desc: string;
  btn_be: string;

  // --- ANIME LIST ---
  anime_title: string;
  anime_subtitle: string;
  anime_search: string;
  btn_read_synopsis: string;

  // --- SERVICES PAGE ---
  services_title: string;
  services_subtitle: string;
  serv_graphic_title: string;
  serv_graphic_desc: string;
  serv_graphic_list: string;
  serv_web_title: string;
  serv_web_desc: string;
  serv_web_list: string;
  serv_uiux_title: string;
  serv_uiux_desc: string;
  serv_uiux_list: string;
  serv_cta_title: string;
  serv_cta_btn: string;

  // --- COMMON ---
  copyright: string;
  rights: string;
  built_with: string;

  // --- ENTERTAINMENT (optional, used by Sidebar) ---
  nav_entertainment?: string;

  // --- DETAIL PAGES ---
  detail_view: string;
  detail_back: string;
  detail_error: string;
  detail_notfound: string;
  detail_about: string;
  detail_zoom: string;
  detail_order: string;
  detail_free: string;
  detail_demo: string;
  detail_tags: string;
  detail_traits: string;
  detail_genres: string;
  detail_skills: string;
  detail_visit: string;
  detail_repo: string;
  detail_tools: string;
  detail_verify: string;
  detail_section_store: string;
  detail_section_waifu: string;
  detail_section_anime: string;
  detail_section_projects: string;
  detail_section_achievements: string;
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    // --- SIDEBAR ---
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_achievements: "Achievements",
    nav_contact: "Contact",
    nav_waifu: "Waifu List",
    nav_login: "Login",
    nav_anime: "Anime List",
    nav_services: "Services",
    nav_dashboard: "Dashboard",

    // --- HERO SECTION ---
    hero_greeting: "Hi, I'm",
    hero_based: "Based in Jakarta, Indonesia",
    hero_remote: "Onsite/Freelance",
    hero_desc: "I am a Graphic Designer and Front-End Developer skilled in creating visually appealing, clean, and functional digital interfaces. I work with Next.js, TypeScript, and Tailwind CSS to build responsive user experiences, combining creative design with technical precision. As a detail-oriented and collaborative individual, I am committed to delivering high-quality, modern, and user-friendly results.",
    hero_skills: "Basic Skills & Tools",
    hero_video: "My Wife",
    hero_skills_label: "Skills",
    hero_skills_sub: "My professional skills.",
    hero_featured_highlight: "Featured Highlight",
    hero_featured_sub: "Latest showcase and announcements.",
    hero_sections_title: "Featured Sections",
    hero_sections_sub: "Explore everything I've crafted and accomplished.",
    hero_projects_title: "Projects Showcase",
    hero_projects_built: "projects built",
    hero_projects_desc: "Real apps built to solve real problems.",
    hero_about_title: "About Me",
    hero_about_desc: "The person behind the code.",
    hero_store_title: "Digital Store",
    hero_store_assets: "assets available",
    hero_store_premium: "Premium assets",
    hero_ach_title: "Achievements",
    hero_ach_certs: "certificates",
    hero_ach_milestones: "Milestones",
    hero_services_title: "Professional Services",
    hero_services_desc: "Full-stack web & design solutions.",
    hero_services_graphic: "Graphic Design",
    hero_services_web: "Web Dev",
    hero_services_uiux: "UI/UX",
    hero_services_viewall: "View All →",
    hero_dashboard_title: "Dashboard",
    hero_dashboard_sub: "Analytics & Stats",
    hero_anime_title: "Anime List",
    hero_anime_watched: "titles watched",
    hero_waifu_title: "Waifu List",
    hero_waifu_favorites: "favorites",
    hero_waifu_favchar: "Favorite character",
    hero_contact_title: "Contact",
    hero_contact_sub: "Get in touch",
    hero_contact_hello: "Say Hello",
    hero_contact_hello_desc: "Drop me a message anytime",
    hero_contact_inquiry: "Project Inquiry",
    hero_contact_inquiry_desc: "Let's build something together",
    hero_contact_collab: "Collaboration",
    hero_contact_collab_desc: "Open for freelance & partnership",
    hero_contact_email: "Email Response",
    hero_contact_email_desc: "Usually reply within 24 hours",

    // --- WAIFU LIST ---
    waifu_title: "Waifu List",
    waifu_subtitle: "A collection of characters that stole my heart.",

    // --- CHARACTER 1: ALYA ---
    alya_name: "Alisa Mikhailovna Kujou",
    alya_role: "Roshidere (Alya Sometimes Hides Her Feelings in Russian)",
    alya_desc: "The main heroine with silver hair and blue eyes. A mix of Russian and Japanese heritage, she serves as the Student Council Treasurer. Often seen as a solitary 'Ice Queen' due to her perfect appearance, she secretly hides her affectionate feelings by muttering them in Russian.",
    alya_job_label: "Role",
    alya_job_val: "Student Council Treasurer",
    alya_origin_label: "Heritage",
    alya_origin_val: "Russian-Japanese 🇷🇺🇯🇵",

    // --- CHARACTER 2: CASTORICE ---
    wife2_name: "Castorice",
    wife2_role: "Honkai: Star Rail",
    wife2_desc: "From the land that worships death, Aidonia, where snow falls endlessly. Castorice, daughter of the River of Souls, Heir of Chrysos seeking the Coreflame Death, sets forth. You must guard the wailing of souls and embrace the silence of destiny.",
    wife2_job_label: "Title",
    wife2_job_val: "Heir of Chrysos",
    wife2_origin_label: "Origin",
    wife2_origin_val: "Aidonia ❄️",

    // --- CHARACTER 3: SHOREKEEPER ---
    wife3_name: "Shorekeeper",
    wife3_role: "Wuthering Waves",
    wife3_desc: "A mysterious guardian associated with the Black Shores. She possesses an ethereal and calm demeanor, often guiding Rovers through their journey with cryptic yet profound wisdom.",
    wife3_job_label: "Affiliation",
    wife3_job_val: "Black Shores",
    wife3_origin_label: "Element",
    wife3_origin_val: "Spectro ✨",

    // --- CHARACTER 4: KUCHIBA CHISA ---
    wife4_name: "Kuchiba Chisa",
    wife4_role: "Wuthering Waves",
    wife4_desc: "Chisa is a playable Havoc Mutant Resonator in Wuthering Waves. Chisa is a conscientious, level-headed student from the Startorch Academy. To her, everything can be broken down, analyzed, and resolved, with the exception of human bonding. Bonds can be severed, but this fragility is what makes them precious.",
    wife4_job_label: "Affiliation",
    wife4_job_val: "Startorch Academy",
    wife4_origin_label: "Element",
    wife4_origin_val: "Havoc 🌀",

    // --- ABOUT PAGE ---
    about_title: "About Me",
    about_subtitle: "A glimpse into my journey, experience, and what drives me.",
    about_open_to_work: "Open to Work",
    about_role: "Graphic Designer | IT Enthusiast",
    about_download_cv: "Download CV",
    about_biography: "Biography",
    about_bio_1: "Hello, I'm Robby Fabian. I started my journey as a graphic designer, obsessed with pixels and layouts. Over time, my curiosity led me to the world of programming, where I found the perfect blend of logic and creativity.",
    about_bio_2: "Currently, I focus on creating and developing applications or websites where I also combine minimalist and elegant designs in websites or applications so that they are visually appealing to clients.",
    about_work_experience: "Work Experience",
    about_no_experience: "No work experience added yet.",
    about_education: "Education",
    about_no_education: "No education details added yet.",

    // --- PROJECTS ---
    proj_title: "Projects",
    proj_subtitle: "A selection of my favorite works.",
    btn_view_project: "View Project",

    // --- ACHIEVEMENTS ---
    ach_title: "Achievements",
    ach_subtitle: "My professional certifications, awards, and recognitions.",
    ach_search: "Search certificates...",
    btn_view_cred: "View Credential",

    // --- MUSIC ROOM ---
    music_title: "Music Room",
    music_subtitle: "Explore music and playlists.",
    music_search: "Search...",
    music_filter: "Filter...",

    // --- CONTACT PAGE ---
    contact_title: "Contact",
    contact_subtitle: "Let's get in touch.",
    contact_socials: "Find me on social media",
    email_title: "Stay in Touch",
    email_desc: "Reach out via email for inquiries or collaborations.",
    btn_email: "Go to Gmail",
    ig_title: "Follow My Journey",
    ig_desc: "Follow my creative journey.",
    btn_ig: "Go to Instagram",
    li_title: "Let's Connect",
    li_desc: "Connect with me professionally.",
    btn_li: "Go to Linkedin",
    wa_title: "Chat on WhatsApp",
    wa_desc: "Send a message directly on WhatsApp for quick communication.",
    btn_wa: "Go to Whatsapp",
    gh_title: "Explore the Code",
    gh_desc: "Explore my open-source work.",
    btn_gh: "Go to Github",
    be_title: "Design Portfolio",
    be_desc: "View my design projects on Behance.",
    btn_be: "Go to Behance",

    // --- ANIME LIST ---
    anime_title: "Anime Watchlist",
    anime_subtitle: "Tracking my journey through animation. Shows I'm watching, completed, or planning to watch.",
    anime_search: "Search titles...",
    btn_read_synopsis: "Read Synopsis",

    // --- SERVICES PAGE ---
    services_title: "My Services",
    services_subtitle: "Professional solutions for your digital needs.",
    serv_graphic_title: "Graphic Design",
    serv_graphic_desc: "Creating visually stunning designs that capture attention and communicate your brand message effectively.",
    serv_graphic_list: "Social Media Feeds, Event Posters, Banners, Branding Assets",
    serv_web_title: "Web Development",
    serv_web_desc: "Building fast, responsive, and SEO-friendly websites using modern technologies like Next.js and Tailwind CSS.",
    serv_web_list: "Landing Pages, Company Profiles, Portfolio Websites",
    serv_uiux_title: "UI/UX Design",
    serv_uiux_desc: "Designing intuitive and aesthetic user interfaces with a focus on seamless user experience.",
    serv_uiux_list: "Mobile App Design, Web Design, Wireframing, Prototyping (Figma)",
    serv_cta_title: "Ready to start a project?",
    serv_cta_btn: "Let's Talk",

    // --- COMMON ---
    copyright: "COPYRIGHT",
    rights: "All rights reserved.",
    built_with: "Built with Next.js",

    // --- DETAIL PAGES ---
    detail_view: "View Details",
    detail_back: "Back",
    detail_error: "Failed to load details.",
    detail_notfound: "This item could not be found.",
    detail_about: "About",
    detail_zoom: "Zoom",
    detail_order: "Order Now",
    detail_free: "FREE",
    detail_demo: "Live Demo",
    detail_tags: "Features",
    detail_traits: "Traits",
    detail_genres: "Genres",
    detail_skills: "Skills",
    detail_visit: "Visit Page",
    detail_repo: "Source Code",
    detail_tools: "Tech Stack",
    detail_verify: "Verify Credential",
    detail_section_store: "Store",
    detail_section_waifu: "Waifu",
    detail_section_anime: "Anime",
    detail_section_projects: "Projects",
    detail_section_achievements: "Achievements"
  },

  id: {
    // --- SIDEBAR ---
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_projects: "Proyek",
    nav_achievements: "Pencapaian",
    nav_contact: "Kontak",
    nav_waifu: "Daftar Waifu",
    nav_login: "Masuk",
    nav_anime: "Daftar Anime",
    nav_services: "Layanan",
    nav_dashboard: "Dashboard",

    // --- HERO SECTION ---
    hero_greeting: "Hai, Saya",
    hero_based: "Berbasis di Jakarta, Indonesia",
    hero_remote: "Onsite/Freelance",
    hero_desc: "Saya adalah Desainer Grafis dan Front-End Developer yang ahli dalam menciptakan antarmuka digital yang menarik, bersih, dan fungsional. Saya menggunakan Next.js, TypeScript, dan Tailwind CSS untuk membangun pengalaman pengguna yang responsif, menggabungkan desain kreatif dengan presisi teknis. Sebagai individu yang detail dan kolaboratif, saya berkomitmen memberikan hasil berkualitas tinggi, modern, dan ramah pengguna.",
    hero_skills: "Keahlian Dasar & Alat",
    hero_video: "Istri Saya",
    hero_skills_label: "Keahlian",
    hero_skills_sub: "Keahlian profesional saya.",
    hero_featured_highlight: "Sorotan Utama",
    hero_featured_sub: "Showcase dan pengumuman terbaru.",
    hero_sections_title: "Bagian Utama",
    hero_sections_sub: "Jelajahi semua yang telah saya buat dan raih.",
    hero_projects_title: "Showcase Proyek",
    hero_projects_built: "proyek selesai",
    hero_projects_desc: "Aplikasi nyata untuk masalah nyata.",
    hero_about_title: "Tentang Saya",
    hero_about_desc: "Orang di balik kode.",
    hero_store_title: "Toko Digital",
    hero_store_assets: "aset tersedia",
    hero_store_premium: "Aset premium",
    hero_ach_title: "Pencapaian",
    hero_ach_certs: "sertifikat",
    hero_ach_milestones: "Pencapaian",
    hero_services_title: "Layanan Profesional",
    hero_services_desc: "Solusi web & desain menyeluruh.",
    hero_services_graphic: "Desain Grafis",
    hero_services_web: "Web Dev",
    hero_services_uiux: "UI/UX",
    hero_services_viewall: "Lihat Semua →",
    hero_dashboard_title: "Dashboard",
    hero_dashboard_sub: "Analitik & Statistik",
    hero_anime_title: "Daftar Anime",
    hero_anime_watched: "judul ditonton",
    hero_waifu_title: "Daftar Waifu",
    hero_waifu_favorites: "favorit",
    hero_waifu_favchar: "Karakter favorit",
    hero_contact_title: "Kontak",
    hero_contact_sub: "Hubungi saya",
    hero_contact_hello: "Sapa Saya",
    hero_contact_hello_desc: "Kirim pesan kapan saja",
    hero_contact_inquiry: "Pertanyaan Proyek",
    hero_contact_inquiry_desc: "Mari bangun sesuatu bersama",
    hero_contact_collab: "Kolaborasi",
    hero_contact_collab_desc: "Terbuka untuk freelance & kemitraan",
    hero_contact_email: "Respons Email",
    hero_contact_email_desc: "Biasanya membalas dalam 24 jam",

    // --- WAIFU LIST ---
    waifu_title: "Daftar Waifu",
    waifu_subtitle: "Koleksi karakter yang mencuri hati saya.",

    // --- CHARACTER 1: ALYA ---
    alya_name: "Alisa Mikhailovna Kujou",
    alya_role: "Roshidere (Alya Sometimes Hides Her Feelings in Russian)",
    alya_desc: "Tokoh utama wanita berambut perak dan bermata biru. Gadis keturunan Rusia-Jepang ini menjabat sebagai Bendahara OSIS. Sering dianggap sebagai 'Ratu Es' yang menyendiri karena penampilannya yang sempurna, ia sebenarnya menyembunyikan perasaan malunya dengan bergumam dalam bahasa Rusia.",
    alya_job_label: "Posisi",
    alya_job_val: "Bendahara OSIS",
    alya_origin_label: "Keturunan",
    alya_origin_val: "Rusia-Jepang 🇷🇺🇯🇵",

    // --- CHARACTER 2: CASTORICE ---
    wife2_name: "Castorice",
    wife2_role: "Honkai: Star Rail",
    wife2_desc: "Dari negeri yang memuja kematian, Aidonia, tempat salju turun tanpa henti. Castorice, putri Sungai Jiwa, Pewaris Chrysos yang mencari Api Inti Kematian, melangkah maju. Kau harus menjaga ratapan jiwa dan merangkul kesunyian takdir.",
    wife2_job_label: "Gelar",
    wife2_job_val: "Pewaris Chrysos",
    wife2_origin_label: "Asal",
    wife2_origin_val: "Aidonia ❄️",

    // --- CHARACTER 3: SHOREKEEPER ---
    wife3_name: "Shorekeeper",
    wife3_role: "Wuthering Waves",
    wife3_desc: "Penjaga misterius yang terkait dengan Black Shores. Dia memiliki sikap yang anggun dan tenang, sering membimbing Rover melalui perjalanan mereka dengan kebijaksanaan yang samar namun mendalam.",
    wife3_job_label: "Afiliasi",
    wife3_job_val: "Black Shores",
    wife3_origin_label: "Elemen",
    wife3_origin_val: "Spectro ✨",

    // --- CHARACTER 4: KUCHIBA CHISA ---
    wife4_name: "Kuchiba Chisa",
    wife4_role: "Wuthering Waves",
    wife4_desc: "Chisa adalah karakter Havoc Mutant Resonator di Wuthering Waves. Chisa adalah seorang siswa yang teliti dan berkepala dingin dari Akademi Startorch. Baginya, segala sesuatu dapat diurai, dianalisis, dan diselesaikan, kecuali ikatan antarmanusia. Ikatan dapat diputus, tetapi kerentanan inilah yang membuatnya berharga.",
    wife4_job_label: "Afiliasi",
    wife4_job_val: "Startorch Academy",
    wife4_origin_label: "Elemen",
    wife4_origin_val: "Havoc 🌀",

    // --- ABOUT PAGE ---
    about_title: "Tentang Saya",
    about_subtitle: "Sekilas tentang perjalanan, pengalaman, dan apa yang mendorong saya.",
    about_open_to_work: "Terbuka untuk Bekerja",
    about_role: "Desainer Grafis | IT Enthusiast",
    about_download_cv: "Unduh CV",
    about_biography: "Biografi",
    about_bio_1: "Halo, saya Robby Fabian. Saya memulai perjalanan sebagai desainer grafis, terobsesi dengan piksel dan tata letak. Seiring waktu, rasa ingin tahu saya membawa saya ke dunia pemrograman, di mana saya menemukan perpaduan sempurna antara logika dan kreativitas.",
    about_bio_2: "Saat ini, saya fokus pada pembuatan dan pengembangan aplikasi atau website di mana saya juga menggabungkan desain minimalis dan elegan agar menarik secara visual bagi klien.",
    about_work_experience: "Pengalaman Kerja",
    about_no_experience: "Belum ada pengalaman kerja.",
    about_education: "Pendidikan",
    about_no_education: "Belum ada detail pendidikan.",

    // --- PROJECTS ---
    proj_title: "Proyek",
    proj_subtitle: "Pilihan karya favorit saya.",
    btn_view_project: "Lihat Proyek",

    // --- ACHIEVEMENTS ---
    ach_title: "Pencapaian",
    ach_subtitle: "Sertifikasi, penghargaan, dan pencapaian profesional saya.",
    ach_search: "Cari sertifikat...",
    btn_view_cred: "Lihat Kredensial",

    // --- MUSIC ROOM ---
    music_title: "Ruang Musik",
    music_subtitle: "Jelajahi musik dan playlist.",
    music_search: "Cari...",
    music_filter: "Filter...",

    // --- CONTACT PAGE ---
    contact_title: "Kontak",
    contact_subtitle: "Mari terhubung.",
    contact_socials: "Temukan saya di sosial media",
    email_title: "Tetap Terhubung",
    email_desc: "Hubungi via email untuk pertanyaan atau kolaborasi.",
    btn_email: "Buka Gmail",
    ig_title: "Ikuti Perjalanan Saya",
    ig_desc: "Ikuti perjalanan kreatif saya.",
    btn_ig: "Buka Instagram",
    li_title: "Mari Terhubung",
    li_desc: "Terhubung dengan saya secara profesional.",
    btn_li: "Buka Linkedin",
    wa_title: "Chat di WhatsApp",
    wa_desc: "Kirim pesan langsung di WhatsApp untuk komunikasi cepat.",
    btn_wa: "Buka Whatsapp",
    gh_title: "Jelajahi Kode",
    gh_desc: "Lihat karya open-source saya.",
    btn_gh: "Buka Github",
    be_title: "Portofolio Desain",
    be_desc: "Lihat proyek desain saya di Behance.",
    btn_be: "Buka Behance",

    // --- ANIME LIST ---
    anime_title: "Daftar Anime",
    anime_subtitle: "Menelusuri perjalanan saya dalam animasi. Tontonan yang sedang, sudah, atau akan saya tonton.",
    anime_search: "Cari judul...",
    btn_read_synopsis: "Baca Sinopsis",

    // --- SERVICES PAGE ---
    services_title: "Layanan Saya",
    services_subtitle: "Solusi profesional untuk kebutuhan digital Anda.",
    serv_graphic_title: "Desain Grafis",
    serv_graphic_desc: "Membuat desain visual yang menakjubkan yang menarik perhatian dan mengkomunikasikan pesan merek Anda secara efektif.",
    serv_graphic_list: "Konten Sosmed, Poster Acara, Banner, Aset Branding",
    serv_web_title: "Pengembangan Web",
    serv_web_desc: "Membangun website yang cepat, responsif, dan ramah SEO menggunakan teknologi modern seperti Next.js dan Tailwind CSS.",
    serv_web_list: "Landing Page, Profil Perusahaan, Website Portofolio",
    serv_uiux_title: "Desain UI/UX",
    serv_uiux_desc: "Merancang antarmuka pengguna yang intuitif dan estetis dengan fokus pada pengalaman pengguna yang mulus.",
    serv_uiux_list: "Desain Aplikasi Mobile, Desain Web, Wireframing, Prototyping (Figma)",
    serv_cta_title: "Siap memulai proyek?",
    serv_cta_btn: "Mari Bicara",

    // --- COMMON ---
    copyright: "HAK CIPTA",
    rights: "Hak cipta dilindungi.",
    built_with: "Dibuat dengan Next.js",

    // --- DETAIL PAGES ---
    detail_view: "Lihat Detail",
    detail_back: "Kembali",
    detail_error: "Gagal memuat detail.",
    detail_notfound: "Item ini tidak ditemukan.",
    detail_about: "Tentang",
    detail_zoom: "Perbesar",
    detail_order: "Pesan Sekarang",
    detail_free: "GRATIS",
    detail_demo: "Demo Langsung",
    detail_tags: "Fitur",
    detail_traits: "Sifat",
    detail_genres: "Genre",
    detail_skills: "Keahlian",
    detail_visit: "Kunjungi Halaman",
    detail_repo: "Kode Sumber",
    detail_tools: "Teknologi",
    detail_verify: "Verifikasi Kredensial",
    detail_section_store: "Store",
    detail_section_waifu: "Waifu",
    detail_section_anime: "Anime",
    detail_section_projects: "Proyek",
    detail_section_achievements: "Pencapaian"
  }
};
