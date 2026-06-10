import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const text = message.toLowerCase(); // Ubah ke huruf kecil biar mudah dicek

    let reply = "";

    // --- LOGIKA OTAK MIKOO BOT (RULE BASED) ---
    
    // 1. Sapaan
    if (text.includes("halo") || text.includes("hai") || text.includes("hi") || text.includes("pagi") || text.includes("sore")) {
      reply = "Halo kak! 👋 Ada yang bisa Mikoo bantu? Ketik '-menu' buat liat opsi ya!";
    }
    
    // 2. Identitas
    else if (text.includes("siapa") || text.includes("kamu") || text.includes("robot")) {
      reply = "Kenalin, aku Mikoo Bot 🤖. Asisten pribadinya Robby Fabian. Aku bertugas ngejelasin skill dan project-nya Robby!";
    }
    else if (text.includes("robby") || text.includes("admin") || text.includes("creator")) {
      reply = "Robby Fabian itu UI/UX Designer & Frontend Dev yang jago banget bikin desain Pixel Art! 😎";
    }

    // 3. Menu & Harga
    else if (text.includes("menu") || text.includes("bantuan") || text.includes("help")) {
      reply = "🤖 **MENU MIKOO** 🤖\n\n👉 -Pricelist (Cek Harga)\n👉 -Gambar (Liat Random Design)\n👉 -Payment (Cara Bayar)\n👉 -Kontak (Hubungi Robby)";
    }
    else if (text.includes("price") || text.includes("harga") || text.includes("biaya")) {
      reply = "💰 **PRICELIST** 💰\n\n• Poster Sport: 50k\n• Banner Youtube: 75k\n• Web Landing Page: Mulai 150k\n• Full Branding: Nego Aja Sabi ✨";
    }

    // 4. Pembayaran & Kontak
    else if (text.includes("bayar") || text.includes("pay") || text.includes("dana") || text.includes("rekening")) {
      reply = "💳 **CARA BAYAR** 💳\n\nBisa lewat:\n• DANA: 0812-xxxx-xxxx\n• Bank Jago: 1029-xxxx\n• Atau scan QRIS di profil ya!";
    }
    else if (text.includes("kontak") || text.includes("wa") || text.includes("email") || text.includes("ig")) {
      reply = "📞 **KONTAK ROBBY** 📞\n\nInstagram: @mikoograph_\nEmail: robby@contoh.com\nLinkedIn: Robby Fabian";
    }

    // 5. Fitur Fun (Gambar & Joke)
    else if (text.includes("lucu") || text.includes("joke") || text.includes("pantun")) {
      const jokes = [
        "Ikan apa yang suka berhenti? Ikan pause. 🐋",
        "Kenapa programmer nggak suka alam? Karena banyak bugs. 🐞",
        "Gula apa yang bukan gula? Gula aren't. 🤣",
        "Hidup itu kayak pixel, kalau di-zoom pecah, kalau dilihat jauh indah."
      ];
      reply = jokes[Math.floor(Math.random() * jokes.length)];
    }
    else if (text.includes("gambar") || text.includes("foto") || text.includes("design") || text.includes("karya")) {
      reply = "Nih aku kasih liat salah satu karya Robby yang kece abis! 👇"; 
      // (Frontend akan menangani pengiriman gambarnya)
    }

    // 6. Fallback (Jika tidak mengerti)
    else {
      const confused = [
        "Waduh, Mikoo belum diajarin kata itu sama Robby 😅. Coba ketik '-menu' deh!",
        "Hmm, maksudnya gimana kak? Coba tanya soal 'harga' atau 'kontak' ya.",
        "Maaf, sirkuit aku agak lemot. Bisa ulangi dengan kata lain? 🤖"
      ];
      reply = confused[Math.floor(Math.random() * confused.length)];
    }

    // Simulate Network Delay (Biar berasa kayak mikir beneran)
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ text: reply });
    
  } catch (error) {
    return NextResponse.json({ text: "Error sistem." }, { status: 500 });
  }
}