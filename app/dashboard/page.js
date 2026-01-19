"use client";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, Globe, Smartphone, Monitor, 
  GitCommit, Clock, ArrowUpRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { GitHubCalendar } from 'react-github-calendar';

// --- UTILS: FORMAT DATE ---
const formatTimeAgo = (dateString) => {
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
    const fetchTraffic = async () => {
      setLoading(true);
      try {
        // Ambil data real dari tabel traffic_logs
        const { data, error } = await supabase
          .from('traffic_logs')
          .select('*')
          .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

        if (data) setLogs(data);
      } catch (err) {
        console.error("Error fetching traffic:", err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Sedikit delay untuk pamer skeleton :D
      }
    };

    fetchTraffic();
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
      .slice(0, 4); // Ambil 4 teratas

    return { totalViews, mobileCount, desktopCount, topPages };
  }, [logs]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="w-full space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="border-b border-zinc-200 dark:border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
          <LayoutDashboard className="text-cyan-500" size={28} />
          Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Real-time insights from <span className="font-mono text-cyan-500">traffic_logs</span> & GitHub.
        </p>
      </div>

      {/* BENTO GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* 1. TOTAL VIEWS (Large Number) */}
        <BentoCard className="col-span-1 md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-none">
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
            {/* Dekorasi Background */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
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
               <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div 
                   className="bg-emerald-500 h-full rounded-full" 
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
               <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div 
                   className="bg-rose-500 h-full rounded-full" 
                   style={{ width: `${(stats.mobileCount / (stats.totalViews || 1)) * 100}%` }} 
                 />
               </div>
               <p className="text-[10px] text-zinc-500 mt-1">
                 {((stats.mobileCount / (stats.totalViews || 1)) * 100).toFixed(0)}% of traffic
               </p>
            </div>
          </div>
        </BentoCard>

        {/* 4. RECENT ACTIVITY LOGS (Tall Card) */}
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2">
           <div className="flex items-center gap-2 mb-6 text-zinc-500 dark:text-zinc-400">
              <Clock size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Recent Visits</span>
           </div>
           <div className="space-y-4 relative">
              {/* Garis Konektor Vertical */}
              <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
              
              {logs.slice(0, 6).map((log, i) => (
                <div key={log.id} className="flex gap-3 items-start relative group">
                   <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 mt-1.5 ring-4 ring-white dark:ring-[#121212] z-10" />
                   <div className="flex-1">
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 font-mono truncate w-full">
                        {log.page_path}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {log.device_type} • {formatTimeAgo(log.created_at)}
                      </p>
                   </div>
                </div>
              ))}
              {logs.length === 0 && <p className="text-xs text-zinc-500">No logs yet.</p>}
           </div>
        </BentoCard>

        {/* 5. TOP PAGES */}
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-3">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <ArrowUpRight size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Top Pages</span>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stats.topPages.map(([path, count], i) => (
                <div key={path} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5">
                    <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{path}</span>
                    <span className="text-xs font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                      {count}
                    </span>
                </div>
              ))}
           </div>
        </BentoCard>

        {/* 6. GITHUB CONTRIBUTIONS (Wide Bottom) */}
        <BentoCard className="col-span-1 md:col-span-3 lg:col-span-4 overflow-hidden">
           <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
              <GitCommit size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Contribution Graph (@{GITHUB_USERNAME})
              </span>
           </div>
           <div className="overflow-x-auto custom-scrollbar pb-2">
             <div className="min-w-[700px] mx-auto flex justify-center">
                <GitHubCalendar 
                    username={GITHUB_USERNAME}
                    colorScheme="dark"
                    fontSize={12}
                    blockSize={11}
                    blockMargin={4}
                    theme={{
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                />
             </div>
           </div>
        </BentoCard>

      </div>
    </div>
  );
}

// --- COMPONENT: BENTO CARD (With Glass Light Effect) ---
function BentoCard({ children, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`
        group relative overflow-hidden rounded-3xl p-6
        bg-white dark:bg-[#121212] 
        border border-zinc-200 dark:border-zinc-800
        hover:border-zinc-300 dark:hover:border-zinc-700
        transition-all duration-500
        shadow-sm hover:shadow-xl
        ${className}
      `}
    >
      {/* Glass/Light Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 group-hover:from-white/5 group-hover:via-white/10 group-hover:to-transparent transition-opacity duration-700 pointer-events-none z-0" />
      
      {/* Light Blob on Hover */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine dark:opacity-5" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

// --- COMPONENT: SKELETON LOADING ---
function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
       <div className="h-20 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
       
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="col-span-1 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="col-span-1 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="col-span-1 lg:row-span-2 h-96 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="col-span-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
       </div>
    </div>
  );
}