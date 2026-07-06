import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simpan data IP di memori server untuk pembatasan (Rate Limit)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function POST(request: Request) {
  try {
    // 1. Dapatkan IP Address pengguna untuk identifikasi
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const WINDOW_TIME = 60 * 1000; // 1 Menit
    const MAX_REQUESTS = 3;        // Maksimal 3 kali kirim per menit

    const limitData = rateLimitMap.get(ip);

    if (!limitData || (now - limitData.lastReset > WINDOW_TIME)) {
      // Jika IP baru atau sudah lewat 1 menit, reset hitungan
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      // Jika masih dalam rentang 1 menit, tambah hitungan
      if (limitData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Terlalu banyak mencoba. Silakan tunggu 1 menit lagi.' },
          { status: 429 } // HTTP Status: Too Many Requests
        );
      }
      limitData.count += 1;
    }

    // 2. Jalankan proses kirim email jika lolos rate limit
    const { name, email, notes, productTitle, productPrice } = await request.json();

    const data = await resend.emails.send({
      from: 'Store Robby <onboarding@resend.dev>',
      to: 'robbyfabian20@gmail.com',
      subject: `🛒 New Order: ${productTitle}`,
      html: `
        <h2>New Order Notification</h2>
        <p><strong>Product:</strong> ${productTitle} (${productPrice})</p>
        <hr />
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Customer Email:</strong> ${email}</p>
        <p><strong>Notes/Requirements:</strong></p>
        <p style="white-space: pre-wrap;">${notes || '-'}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}