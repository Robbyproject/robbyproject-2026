"use client";

export default function ContentWrapper({ children }) {
  return (
    // 👇 SETTINGAN PUSAT (Ubah disini, berubah di SEMUA halaman)
    // pt-24 : Jarak atas Mobile (biar gak kena Header/Menu)
    // lg:pt-14 : Jarak atas Desktop (biar judul gak mepet atas)
    // px-6  : Jarak samping Mobile
    // lg:px-16 : Jarak samping Desktop (biar lega)
    
    <div className="w-full flex-1 flex flex-col pt-24 px-6 pb-10 lg:pt-14 lg:px-16 lg:pb-12 max-w-[1920px] mx-auto">
      {children}
    </div>
  );
}