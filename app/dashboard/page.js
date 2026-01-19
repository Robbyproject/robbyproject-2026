"use client";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, Globe, Smartphone, Monitor,
  GitCommit, Clock, ArrowUpRight, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { GitHubCalendar } from 'react-github-calendar';

// --- UTILS: FORMAT DATE (Optimized) ---
const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const GITHUB_USERNAME = "Robbyproject";

  // --- FETCH DATA ---
  useEffect(() => {
    let isMounted = true;

    const fetchTraffic = async () => {
      try {
        // OPTIMASI: Hanya select kolom yang dibutuhkan untuk hemat bandwidth
        const { data, error } = await supabase
          .from('traffic_logs')
          .select('id, device_type, page_path, created_at')
          .order('created_at', { ascending: false });

        if (isMounted) {
          if (data) setLogs(data);
          if (error) console.error("Supabase Error:", error);
        }
      } catch (err) {
        console.error("Error fetching traffic:", err);
      } finally {
        if (isMounted) setTimeout(() => setLoading(false), 800);
      }
    };

    fetchTraffic();

    return () => { isMounted = false; };
  }, []);

  // --- PROCESSED STATS (Memoized) ---
  const stats = useMemo(() => {
    const totalViews = logs.length;

    // Hitung Device Type (Mobile vs Desktop)
    const devices = logs.reduce((acc, log) => {
      const type = log.device_type || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const mobileCount = devices['Mobile'] || 0;
    const desktopCount = devices['Desktop'] || 0;

    // Hitung Top Pages
    const pages = logs.reduce((acc, log) => {
      const path = log.page_path || '/';
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {});

    const topPages = Object.entries(pages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);

    return { totalViews, mobileCount, desktopCount, topPages };
  }, [logs]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="w-full space-y-8 pb-20 pt-4">

      {/* HEADER */}
      <div className="border-b border-zinc-200 dark:border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
          <Activity className="text-cyan-500" size={32} />
          Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Overview of your application performance and activities.
        </p>
      </div>

      {/* BENTO GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* 1. TOTAL VIEWS (Main Card) */}
        <BentoCard className="col-span-1 md:col-span-2 bg-zinc-900 text-white border-zinc-800">
          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="flex items-center gap-2 text-zinc-400 mb-4">
              <Globe size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Total Traffic</span>
            </div>
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
                {stats.totalViews}
              </h2>
              <p className="text-zinc-400 text-sm">All-time page views recorded.</p>
            </div>
            {/* Abstract Decoration */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </BentoCard>

        {/* 2. DEVICE STATS (Desktop) */}
        <BentoCard className="col-span-1">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-bold uppercase">Desktop</span>
              <Monitor size={20} />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">{stats.desktopCount}</div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.desktopCount / (stats.totalViews || 1)) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                {((stats.desktopCount / (stats.totalViews || 1)) * 100).toFixed(0)}% of traffic
              </p>
            </div>
          </div>
        </BentoCard>

        {/* 3. DEVICE STATS (Mobile) */}
        <BentoCard className="col-span-1">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-bold uppercase">Mobile</span>
              <Smartphone size={20} />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">{stats.mobileCount}</div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.mobileCount / (stats.totalViews || 1)) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                {((stats.mobileCount / (stats.totalViews || 1)) * 100).toFixed(0)}% of traffic
              </p>
            </div>
          </div>
        </BentoCard>

        {/* 4. RECENT ACTIVITY LOGS */}
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2">
          <div className="flex items-center gap-2 mb-6 text-zinc-500 dark:text-zinc-400">
            <Clock size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Recent Visits</span>
          </div>
          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            {logs.slice(0, 6).map((log) => (
              <div key={log.id} className="flex gap-3 items-start relative group">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 mt-1.5 ring-4 ring-white dark:ring-[#121212] z-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 font-mono truncate">
                    {log.page_path}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {formatTimeAgo(log.created_at)} • {log.device_type}
                  </p>
                </div>
              </div>
            ))}
            {logs.length === 0 && <p className="text-xs text-zinc-500 pl-4">No recent activity.</p>}
          </div>
        </BentoCard>

        {/* 5. TOP PAGES */}
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <ArrowUpRight size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Most Visited</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stats.topPages.map(([path, count]) => (
              <div key={path} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate pr-4">{path}</span>
                <span className="text-xs font-bold bg-white dark:bg-black px-2.5 py-1 rounded-md text-zinc-600 dark:text-zinc-400 shadow-sm border border-zinc-100 dark:border-zinc-800">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 6. GITHUB CONTRIBUTIONS */}
        <BentoCard className="col-span-1 md:col-span-3 lg:col-span-4 overflow-hidden min-h-[200px]">
          <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
            <GitCommit size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Contributions (@{GITHUB_USERNAME})
            </span>
          </div>
          {/* Wrapper untuk Horizontal Scroll yang Aman */}
          <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
            <div className="min-w-[720px] lg:w-full flex lg:justify-center">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                fontSize={12}
                blockSize={11}
                blockMargin={4}
                style={{ color: '#a1a1aa' }} // zinc-400
                theme={{
                  // Custom Theme matching Zinc/Emerald
                  dark: ['#18181b', '#064e3b', '#059669', '#10b981', '#34d399'],
                }}
              />
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  );
}

// --- COMPONENT: BENTO CARD (Reusable) ---
function BentoCard({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`
        group relative overflow-hidden rounded-3xl p-6
        bg-white dark:bg-[#121212] 
        border border-zinc-200 dark:border-zinc-800
        hover:border-zinc-300 dark:hover:border-zinc-700
        transition-all duration-300
        shadow-sm hover:shadow-lg
        ${className}
      `}
    >
      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

// --- COMPONENT: SKELETON LOADING (Matching Grid) ---
function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse pt-4 pb-20">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg opacity-60" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        <div className="col-span-1 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        <div className="col-span-1 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />

        <div className="col-span-1 lg:row-span-2 h-[350px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />

        <div className="col-span-1 md:col-span-2 lg:col-span-3 h-40 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        <div className="col-span-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
      </div>
    </div>
  );
}