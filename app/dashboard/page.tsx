"use client";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase";
import {
  Globe, Smartphone, Monitor,
  GitCommit, Clock, ArrowUpRight, Activity, RefreshCw,
  ExternalLink, Users, BookOpen, FileCode2
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Dynamic import — CalendarWrapper only loads client-side
const CalendarWrapper = dynamic(() => import("@/components/CalendarWrapper"), {
  ssr: false,
  loading: () => <div className="h-[150px] w-full bg-zinc-100 dark:bg-zinc-900/50 rounded-xl animate-pulse" />,
});

// --- TYPES ---
interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

// --- MODULE-LEVEL CACHE ---
let cachedGithub: GithubProfile | null = null;

// --- UTILS ---
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function DashboardPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [mounted, setMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [githubProfile, setGithubProfile] = useState<GithubProfile | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);

  const GITHUB_USERNAME = "Robbyproject";

  // --- MOUNTED GUARD (for recharts SSR safety) ---
  useEffect(() => { setMounted(true); }, []);

  // --- FETCH TRAFFIC DATA ---
  useEffect(() => {
    let isMounted = true;

    const fetchTraffic = async () => {
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
      const fetchPromise = supabase
        .from('app_visits')
        .select('id, device_type, page_path, created_at')
        .order('created_at', { ascending: false });

      try {
        const result = await Promise.race([fetchPromise, timeoutPromise]);
        if (isMounted && result && result.data) {
          setLogs(result.data);
        }
      } catch (err) {
        console.error("Error fetching traffic:", err);
      } finally {
        if (isMounted) setIsUpdating(false);
      }
    };

    fetchTraffic();
    return () => { isMounted = false; };
  }, []);

  // --- FETCH GITHUB PROFILE ---
  useEffect(() => {
    if (cachedGithub) {
      setGithubProfile(cachedGithub);
      setGithubLoading(false);
      return;
    }

    let isMounted = true;

    const fetchGithub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!res.ok) throw new Error("GitHub API error");
        const data: GithubProfile = await res.json();
        if (isMounted) {
          cachedGithub = data;
          setGithubProfile(data);
        }
      } catch (err) {
        console.error("Error fetching GitHub profile:", err);
      } finally {
        if (isMounted) setGithubLoading(false);
      }
    };

    fetchGithub();
    return () => { isMounted = false; };
  }, []);

  // --- PROCESSED STATS ---
  const stats = useMemo(() => {
    const totalViews = logs.length;
    const devices: Record<string, number> = {};
    const pages: Record<string, number> = {};

    logs.forEach((log) => {
      const type = log.device_type || 'Unknown';
      devices[type] = (devices[type] || 0) + 1;
      const path = log.page_path || '/';
      pages[path] = (pages[path] || 0) + 1;
    });

    const topPages = Object.entries(pages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);

    return {
      totalViews,
      mobileCount: devices['Mobile'] || 0,
      desktopCount: devices['Desktop'] || 0,
      uniquePages: Object.keys(pages).length,
      topPages,
    };
  }, [logs]);

  // --- CHART DATA: Daily views ---
  const chartData = useMemo(() => {
    if (!logs.length) return [];
    const dailyMap: Record<string, number> = {};
    logs.forEach((log) => {
      const day = new Date(log.created_at).toISOString().split('T')[0];
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });
    return Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30)
      .map(([date, views]) => ({
        date: new Date(date + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        views,
      }));
  }, [logs]);

  // --- CHART DATA: Device breakdown ---
  const deviceData = useMemo(() => [
    { name: "Desktop", value: stats.desktopCount, color: "#10b981" },
    { name: "Mobile", value: stats.mobileCount, color: "#f43f5e" },
  ], [stats.desktopCount, stats.mobileCount]);

  // --- CHART COLORS (theme-aware) ---
  const chartColors = useMemo(() => ({
    axis: isDark ? '#52525b' : '#d4d4d8',
    grid: isDark ? '#27272a' : '#f4f4f5',
    tooltipBg: isDark ? '#1a1a1a' : '#ffffff',
    tooltipBorder: isDark ? '#333333' : '#e5e7eb',
    tooltipText: isDark ? '#ffffff' : '#000000',
    bar: isDark ? '#10b981' : '#059669',
  }), [isDark]);

  return (
    <div className="w-full space-y-6 pb-20 pt-4">

      {/* ── HEADER ── */}
      <div className="border-b border-zinc-200 dark:border-white/5 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <Activity className="text-emerald-500" size={32} />
            Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Overview of your application performance.
          </p>
        </div>
        {isUpdating && (
          <div className="flex items-center gap-2 text-xs text-zinc-400 animate-pulse">
            <RefreshCw size={14} className="animate-spin" />
            Updating...
          </div>
        )}
      </div>

      {/* ── METRICS ROW ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Globe size={18} />}
          label="Total Views"
          value={stats.totalViews}
          color="emerald"
        />
        <MetricCard
          icon={<Monitor size={18} />}
          label="Desktop"
          value={stats.desktopCount}
          subtext={stats.totalViews ? `${Math.round((stats.desktopCount / stats.totalViews) * 100)}%` : '—'}
          color="emerald"
        />
        <MetricCard
          icon={<Smartphone size={18} />}
          label="Mobile"
          value={stats.mobileCount}
          subtext={stats.totalViews ? `${Math.round((stats.mobileCount / stats.totalViews) * 100)}%` : '—'}
          color="rose"
        />
        <MetricCard
          icon={<FileCode2 size={18} />}
          label="Unique Pages"
          value={stats.uniquePages}
          color="amber"
        />
      </div>

      {/* ── TRAFFIC CHART ── */}
      <SectionCard icon={<Activity size={16} />} title="Traffic Overview">
        <div className="h-[260px] w-full">
          {mounted && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: chartColors.axis }}
                  axisLine={{ stroke: chartColors.axis }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: chartColors.axis }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    border: `1px solid ${chartColors.tooltipBorder}`,
                    borderRadius: '8px',
                    color: chartColors.tooltipText,
                    fontSize: '12px',
                  }}
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                />
                <Bar dataKey="views" fill={chartColors.bar} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
              {mounted ? "No traffic data yet." : "Loading chart..."}
            </div>
          )}
        </div>
      </SectionCard>

      {/* ── GITHUB PROFILE + TOP PAGES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* GitHub Profile Card */}
        <SectionCard icon={<GitCommit size={16} />} title="GitHub Profile" className="lg:col-span-1">
          {githubLoading ? (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-32" />
              </div>
            </div>
          ) : githubProfile ? (
            <div className="space-y-4">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <Image
                  src={githubProfile.avatar_url}
                  alt={githubProfile.name || githubProfile.login}
                  width={56}
                  height={56}
                  className="rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {githubProfile.name || githubProfile.login}
                  </h3>
                  {githubProfile.bio && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                      {githubProfile.bio}
                    </p>
                  )}
                  <a
                    href={githubProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                  >
                    @{githubProfile.login}
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <GithubStat
                  icon={<BookOpen size={14} />}
                  value={githubProfile.public_repos}
                  label="Repos"
                />
                <GithubStat
                  icon={<Users size={14} />}
                  value={githubProfile.followers}
                  label="Followers"
                />
                <GithubStat
                  icon={<Users size={14} />}
                  value={githubProfile.following}
                  label="Following"
                />
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-zinc-400">
              Unable to load GitHub profile.
            </div>
          )}
        </SectionCard>

        {/* Top Pages Table */}
        <SectionCard icon={<ArrowUpRight size={16} />} title="Most Visited Pages" className="lg:col-span-2">
          {stats.topPages.length > 0 ? (
            <div className="space-y-0">
              {/* Table Header */}
              <div className="flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                <span>Page</span>
                <span>Views</span>
              </div>
              {/* Table Rows */}
              {stats.topPages.map(([path, count], i) => (
                <div
                  key={path}
                  className="flex items-center justify-between px-3 py-2.5 text-sm border-b border-zinc-50 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-600 w-4 text-right shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate">
                      {path}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white tabular-nums shrink-0 ml-4">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-zinc-400">
              No page data yet.
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── RECENT ACTIVITY + DEVICE BREAKDOWN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Visits */}
        <SectionCard icon={<Clock size={16} />} title="Recent Visits">
          <div className="space-y-3 relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            {logs.length > 0 ? (
              logs.slice(0, 6).map((log) => (
                <div key={log.id} className="flex gap-3 items-start relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 ring-4 ring-white dark:ring-[#121212] z-10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 font-mono truncate">
                      {log.page_path}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {formatTimeAgo(log.created_at)} · {log.device_type}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500 pl-4 py-2 italic">
                {isUpdating ? "Checking data..." : "No recent activity."}
              </p>
            )}
          </div>
        </SectionCard>

        {/* Device Breakdown */}
        <SectionCard icon={<Monitor size={16} />} title="Device Breakdown">
          <div className="h-[200px] w-full">
            {mounted && stats.totalViews > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartColors.tooltipBg,
                      border: `1px solid ${chartColors.tooltipBorder}`,
                      borderRadius: '8px',
                      color: chartColors.tooltipText,
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
                {mounted ? "No device data yet." : "Loading chart..."}
              </div>
            )}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-2">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.name} <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── GITHUB CONTRIBUTIONS CALENDAR ── */}
      <SectionCard icon={<GitCommit size={16} />} title={`Contributions (@${GITHUB_USERNAME})`}>
        <CalendarWrapper />
      </SectionCard>
    </div>
  );
}

// ── SUB-COMPONENTS ──

function MetricCard({
  icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subtext?: string;
  color: "emerald" | "indigo" | "rose" | "amber";
}) {
  const colorMap = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    indigo: "text-indigo-500 bg-indigo-500/10",
    rose: "text-rose-500 bg-rose-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      viewport={{ once: true, margin: "-30px" }}
      className="rounded-xl p-5 bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          {label}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
          {value}
        </span>
        {subtext && (
          <span className="text-xs font-medium text-zinc-400 mb-0.5">
            {subtext}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function SectionCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      viewport={{ once: true, margin: "-30px" }}
      className={`rounded-xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden ${className}`}
    >
      {/* Section Title Bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-zinc-400">{icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </motion.div>
  );
}

function GithubStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
      <div className="flex items-center gap-1.5 text-zinc-400">
        {icon}
        <span className="text-base font-bold text-zinc-900 dark:text-white tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
