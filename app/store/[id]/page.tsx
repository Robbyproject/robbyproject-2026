"use client";

import { useParams } from "next/navigation";
import { ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import { useDetailItem } from "@/components/features/detail/useDetailItem";
import DetailShell from "@/components/features/detail/DetailShell";
import DetailGallery from "@/components/features/detail/DetailGallery";
import { TagChips, ActionButton } from "@/components/features/detail/DetailBits";
import { useLanguage } from "@/components/providers/AppProviders";

const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(num);

export default function StoreDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { t } = useLanguage();
    const { data: item, loading, error } = useDetailItem("products", id);

    const price = item?.price ?? 0;

    return (
        <DetailShell
            sectionLabel={t?.detail_section_store || "Store"}
            sectionHref="/store"
            title={item?.name}
            loading={loading}
            error={error}
            notFound={!loading && !error && !item}
        >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                {/* GALLERY */}
                <DetailGallery
                    mainImage={item?.image_url}
                    gallery={item?.gallery}
                    title={item?.name}
                />

                {/* INFO */}
                <div className="space-y-6">
                    {item?.category && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                            {item.category}
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <ShoppingBag className="text-emerald-500 shrink-0" size={28} />
                        {item?.name}
                    </h1>

                    {/* PRICE */}
                    <div className="inline-flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {price === 0 ? (t?.detail_free || "FREE") : `Rp ${formatRupiah(price)}`}
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    {item?.description && (
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {item.description}
                        </p>
                    )}

                    {/* LONG DESCRIPTION */}
                    {item?.long_description && (
                        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                {t?.detail_about || "About"}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                                {item.long_description}
                            </p>
                        </div>
                    )}

                    {/* TAGS */}
                    <TagChips tags={item?.tags} label={t?.detail_tags || "Features"} />

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <ActionButton
                            href={`/contact?product=${encodeURIComponent(item?.name || "")}`}
                            icon={<ArrowRight size={16} />}
                        >
                            {t?.detail_order || "Order Now"}
                        </ActionButton>
                        {item?.demo_url && (
                            <ActionButton
                                href={item.demo_url}
                                variant="secondary"
                                external
                                icon={<ExternalLink size={16} />}
                            >
                                {t?.detail_demo || "Live Demo"}
                            </ActionButton>
                        )}
                    </div>
                </div>
            </div>
        </DetailShell>
    );
}
