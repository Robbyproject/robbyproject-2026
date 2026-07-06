"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
    ShoppingBag, 
    User, 
    Mail, 
    FileText, 
    ArrowRight, 
    CheckCircle2, 
    ArrowLeft 
} from "lucide-react";

function OrderFormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Mengambil data produk secara dinamis dari URL query
    const productTitle = searchParams.get("title") || "Digital Asset";
    const productPrice = searchParams.get("price") || "FREE";
    const productImage = searchParams.get("image") || ""; // Mengambil parameter gambar

    // State Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    notes,
                    productTitle, // pastikan nama variable ini sesuai dengan yang dikirim
                    productPrice  // pastikan nama variable ini sesuai dengan yang dikirim
                }),
            });

            // --- PERBAIKAN DI SINI ---
            if (!response.ok) {
                // Ambil pesan error mentah dari server API jika ada
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || `Server responded with status ${response.status}`;
                throw new Error(errorMessage);
            }

            setIsSuccess(true);
        } catch (error: any) {
            // Sekarang ini akan mencetak alasan ASLI dari server (misal: API key salah, atau email belum diverifikasi)
            console.error("Detail Error Kirim Order:", error.message || error);
            alert(`Terjadi kesalahan: ${error.message || "Silakan coba lagi."}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-md mx-auto text-center py-20 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-500 mx-auto">
                    <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Order Placed Successfully!</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Thank you for your order. We have received your request for <span className="font-semibold text-zinc-900 dark:text-white">{productTitle}</span> and will contact you via email shortly.
                    </p>
                </div>
                <button
                    onClick={() => router.push("/store")}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-zinc-900 text-white hover:bg-emerald-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-emerald-500 dark:hover:text-white font-medium text-sm transition-all shadow-md"
                >
                    Back to Store
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto space-y-10 min-h-screen pb-20 pt-4 px-4 sm:px-6 lg:px-8">
            
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-white/5 pb-8">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 w-fit transition-colors"
                >
                    <ArrowLeft size={14} /> Back
                </button>
                <div className="space-y-2 max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <ShoppingBag className="text-emerald-500 fill-emerald-500/10" size={32} />
                        Checkout Order
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Complete the detailed specifications below to proceed with your premium resource order.
                    </p>
                </div>
            </div>

            {/* --- TWO COLUMN LAYOUT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* COLUMN 1: PRODUCT INFO DISPLAY (Left) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-5">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                                Selected Asset
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white pt-2">
                                {productTitle}
                            </h2>
                        </div>

                        {/* --- NEW IMAGE SECTION --- */}
                        {productImage && (
                            <div className="w-full relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                                <img 
                                    src={productImage} 
                                    alt={productTitle}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}
                        
                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Investment</span>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{productPrice}</span>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: ORDER FORM (Right) */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                    
                    {/* Input Nama */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                            <User size={14} className="text-zinc-400" /> Full Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* Input Email */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                            <Mail size={14} className="text-zinc-400" /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="johndoe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* Input Catatan / Spesifikasi */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                            <FileText size={14} className="text-zinc-400" /> Custom Notes / Requirements
                        </label>
                        <textarea
                            rows={5}
                            placeholder="Describe any custom changes or additional instructions you need..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl p-4 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white resize-none leading-relaxed"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-medium transition-all duration-300
                            bg-zinc-900 text-white hover:bg-emerald-600 active:scale-98 disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-white dark:text-zinc-900 dark:hover:bg-emerald-500 dark:hover:text-white mt-4"
                    >
                        <span>{isSubmitting ? "Processing Request..." : "Confirm Order Now"}</span>
                        {!isSubmitting && <ArrowRight size={16} />}
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default function OrderPage() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-[1600px] mx-auto space-y-10 min-h-screen pb-20 pt-4 px-4 flex items-center justify-center">
                <div className="text-zinc-400 text-sm animate-pulse">Loading checkout layout...</div>
            </div>
        }>
            <OrderFormContent />
        </Suspense>
    );
}