"use client";

import { useParams } from "next/navigation";
import { Briefcase, ExternalLink, Github, Calendar, Wrench } from "lucide-react";
import { useDetailItem } from "@/components/features/detail/useDetailItem";
import DetailShell from "@/components/features/detail/DetailShell";
import DetailGallery from "@/components/features/detail/DetailGallery";
import { TagChips, ActionButton } from "@/components/features/detail/DetailBits";
import { useLanguage } from "@/components/providers/AppProviders";

export default function ProjectDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { t } = useLanguage();
    const { data: item, loading, error } = useDetailItem("projects", id);

    return (
        <DetailShell
            sectionLabel={t?.detail_section_projects || "Projects"}
            sectionHref="/projects"
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
                    <div className="flex flex-wrap items-center gap-2">
                        {item?.category && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                                {item.category}
                            </span>
                        )}
                        {item?.year && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                <Calendar size={12} />
                                {item.year}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="text-emerald-500 fill-emerald-500/10 shrink-0" size={28} />
                        {item?.title}
                    </h1>

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

                    {/* TOOLS (full) */}
                    {Array.isArray(item?.tools) && item.tools.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                <Wrench size={12} />
                                {t?.detail_tools || "Tech Stack"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {item.tools.map((tool: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAGS (Features) */}
                    <TagChips tags={item?.tags} label={t?.detail_tags || "Features"} />

                    {/* ACTIONS */}
                    {(item?.link_url || item?.repo_url) && (
                        <div className="flex flex-wrap gap-3 pt-2">
                            {item?.link_url && (
                                <ActionButton
                                    href={item.link_url}
                                    external
                                    icon={<ExternalLink size={16} />}
                                >
                                    {t?.detail_visit || "Live Site"}
                                </ActionButton>
                            )}
                            {item?.repo_url && (
                                <ActionButton
                                    href={item.repo_url}
                                    variant="secondary"
                                    external
                                    icon={<Github size={16} />}
                                >
                                    {t?.detail_repo || "Source Code"}
                                </ActionButton>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DetailShell>
    );
}
