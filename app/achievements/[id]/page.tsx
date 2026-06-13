"use client";

import { useParams } from "next/navigation";
import { Trophy, Award, ExternalLink, ShieldCheck, Calendar, Hash } from "lucide-react";
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

export default function AchievementDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { t } = useLanguage();
    const { data: item, loading, error } = useDetailItem("achievements", id);

    const issuer = item?.issuer || item?.category;

    return (
        <DetailShell
            sectionLabel={t?.detail_section_achievements || "Achievements"}
            sectionHref="/achievements"
            title={item?.title}
            loading={loading}
            error={error}
            notFound={!loading && !error && !item}
        >
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                {/* GALLERY */}
                <DetailGallery
                    mainImage={item?.image_url}
                    gallery={item?.gallery}
                    title={item?.title}
                />

                {/* INFO */}
                <div className="space-y-6">
                    {issuer && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                            <Award size={12} />
                            {issuer}
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Trophy className="text-emerald-500 fill-emerald-500/10 shrink-0" size={28} />
                        {item?.title}
                    </h1>

                    {/* METADATA */}
                    {(item?.date_issued || item?.credential_id) && (
                        <div className="grid grid-cols-2 gap-2">
                            <MetaItem icon={<Calendar size={14} />} label="Issued" value={item?.date_issued} />
                            <MetaItem icon={<Hash size={14} />} label="Credential ID" value={item?.credential_id} />
                        </div>
                    )}

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

                    {/* TAGS (Skills) */}
                    <TagChips tags={item?.tags} label={t?.detail_skills || "Skills"} />

                    {/* ACTIONS */}
                    {item?.link_url && (
                        <div className="flex flex-wrap gap-3 pt-2">
                            <ActionButton
                                href={item.link_url}
                                external
                                icon={<ShieldCheck size={16} />}
                            >
                                {t?.detail_verify || "Verify Credential"}
                            </ActionButton>
                        </div>
                    )}
                </div>
            </div>
        </DetailShell>
    );
}
