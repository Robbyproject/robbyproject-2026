import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inisialisasi Resend menggunakan API Key dari .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const contact = formData.get('contact') as string;
    const service = formData.get('service') as string;
    const price = formData.get('price') as string;
    const brief = formData.get('brief') as string;
    const file = formData.get('file') as File | null;

    // Proses konversi file attachment menjadi Buffer jika user mengunggah file brief
    const attachments = [];
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Mengirim email menggunakan HTTP API Resend (Bukan SMTP)
    const { data, error } = await resend.emails.send({
      // Menggunakan domain bawaan Resend untuk testing gratis
      from: 'Portfolio Store <onboarding@resend.dev>',
      to: process.env.MY_RECEIVING_EMAIL as string, // Email Gmail utama kamu
      replyTo: email, // Jika kamu klik 'Reply' di Gmail, otomatis mengarah ke email pembeli
      subject: `🚨 ORDER BARU: ${service} - dari ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
          <h2 style="color: #10b981;">Pesanan Baru Masuk!</h2>
          <p>Seseorang telah mengisi formulir pemesanan produk di website portofolio Anda.</p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 150px;">Nama Jasa:</td><td>${service}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Estimasi Harga:</td><td style="color: #10b981; font-weight: bold;">${price}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Nama Klien:</td><td>${name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email Klien:</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">WhatsApp/Kontak:</td><td>${contact}</td></tr>
          </table>
          <h3 style="margin-top: 25px; border-bottom: 1px solid #e4e4e7; padding-bottom: 5px;">Deskripsi Brief:</h3>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; white-space: pre-line; font-size: 14px;">${brief}</div>
          <p style="font-size: 11px; color: #71717a; margin-top: 40px;">Sistem Otomatis Portofolio Robby Fabian</p>
        </div>
      `,
      attachments: attachments,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memproses email.' }, { status: 500 });
  }
}