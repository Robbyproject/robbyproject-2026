import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// JANGAN taruh "const resend = ..." di sini lagi!

export async function POST(request: Request) {
  try {
    // Ambil API key tepat saat ada request masuk
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("Error: RESEND_API_KEY tidak ditemukan di environment variables.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Instansiasi resend secara aman di dalam handler
    const resend = new Resend(apiKey);

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