"use client";

import { useParams } from "next/navigation";
import { Tv, Star, ExternalLink, Calendar, Film } from "lucide-react";
import { useDetailItem } from "@/components/features/detail/useDetailItem";
import DetailShell from "@/components/features/detail/DetailShell";
import DetailGallery from "@/components/features/detail/DetailGallery";
import { TagChips, ActionButton } from "@/components/features/detail/DetailBits";
import { useLanguage } from "@/components/providers/AppProviders";

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value?: React.ReactNode }) {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-emerald-500">{icon}</span>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wide text-zinc-400">{label}</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{value}</span>
            </div>
        </div>
    );
}

export default function AnimeDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { t } = useLanguage();
    const { data: item, loading, error } = useDetailItem("anime_list", id);

    return (
        <DetailShell
            sectionLabel={t?.detail_section_anime || "Anime"}
            sectionHref="/anime"
            title={item?.title}
            loading={loading}
            error={error}
            notFound={!loading && !error && !item}
        >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                {/* COVER */}
                <DetailGallery
                    mainImage={item?.cover_url || item?.image_url}
                    gallery={item?.gallery}
                    title={item?.title}
                    variant="portrait"
                />

                {/* INFO */}
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Tv className="text-emerald-500 fill-emerald-500/10 shrink-0" size={28} />
                        {item?.title}
                    </h1>

                    {/* METADATA GRID */}
                    {(item?.status || item?.rating || item?.year || item?.studio) && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <MetaItem icon={<Tv size={14} />} label="Status" value={item?.status} />
                            <MetaItem
                                icon={<Star size={14} />}
                                label="Rating"
                                value={item?.rating ? `${item.rating} / 10` : undefined}
                            />
                            <MetaItem icon={<Calendar size={14} />} label="Year" value={item?.year} />
                            <MetaItem icon={<Film size={14} />} label="Studio" value={item?.studio} />
                        </div>
                    )}

                    {/* SYNOPSIS */}
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

                    {/* TAGS (Genres) */}
                    <TagChips tags={item?.tags} label={t?.detail_genres || "Genres"} />

                    {/* ACTIONS */}
                    {item?.link_url && (
                        <div className="flex flex-wrap gap-3 pt-2">
                            <ActionButton
                                href={item.link_url}
                                external
                                icon={<ExternalLink size={16} />}
                            >
                                {t?.detail_visit || "Visit Page"}
                            </ActionButton>
                        </div>
                    )}
                </div>
            </div>
        </DetailShell>
    );
}
