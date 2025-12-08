"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link"; // Import Link
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { 
  Lock, LayoutDashboard, Eye, Map, Clock, ArrowRight, Loader2, ShieldCheck, AlertCircle, ArrowLeft, Home 
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [topPage, setTopPage] = useState("-");
  const [recentLogs, setRecentLogs] = useState([]);

  // --- 1. HANDLE LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN;

    if (pin === correctPin) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setErrorMsg("Access Denied: Invalid Protocol");
      setPin("");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // --- 2. FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('traffic_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTotalViews(data.length);
      setRecentLogs(data.slice(0, 5));

      const grouped = data.reduce((acc, curr) => {
        const path = curr.page_path;
        acc[path] = (acc[path] || 0) + 1;
        return acc;
      }, {});

      const sortedPages = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
      if (sortedPages.length > 0) setTopPage(sortedPages[0]);

      const chartData = Object.keys(grouped).map(key => ({
        name: key,
        views: grouped[key]
      }));

      setStats(chartData);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { 
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
    });
  };

  // ==========================================
  // TAMPILAN 1: LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -top-20 -left-20"></div>

        {/* Tombol Back di Pojok Kiri Atas (Lock Screen) */}
        <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors z-50">
            <ArrowLeft size={20} /> <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl relative z-10"
        >
            <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-zinc-700 shadow-inner">
                    <Lock className="text-cyan-500" size={28} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Restricted Area</h2>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">Admin Authentication Required</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:tracking-normal"
                    placeholder="Enter PIN"
                    autoFocus
                />

                {errorMsg && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 py-2 rounded-lg"
                    >
                        <AlertCircle size={14} /> {errorMsg}
                    </motion.div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    Unlock System <ArrowRight size={16} />
                </button>
            </form>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 2: DASHBOARD UTAMA
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] p-6 lg:p-10 font-sans transition-colors">
        <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header Dashboard dengan Tombol Back */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
                        <LayoutDashboard className="text-cyan-500" /> Analytics Hub
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Real-time traffic monitoring system.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-xs font-bold border border-green-500/20">
                        <ShieldCheck size={14} /> Admin Active
                    </div>
                    
                    {/* Tombol Back di Header Dashboard */}
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                        <Home size={14} /> Home
                    </Link>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="h-64 flex items-center justify-center text-zinc-400 animate-pulse">
                    <Loader2 className="animate-spin mr-2" /> Fetching data from satellite...
                </div>
            ) : (
                <>
                    {/* STATS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute right-4 top-4 p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover:scale-110 transition-transform"><Eye size={20} /></div>
                            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Views</h3>
                            <p className="text-4xl font-black text-zinc-900 dark:text-white">{totalViews}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute right-4 top-4 p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover:scale-110 transition-transform"><Map size={20} /></div>
                            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Most Visited</h3>
                            <p className="text-xl font-bold text-zinc-900 dark:text-white truncate" title={topPage}>{topPage}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute right-4 top-4 p-2 bg-green-500/10 text-green-500 rounded-lg group-hover:scale-110 transition-transform"><Clock size={20} /></div>
                            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">System Status</h3>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Recording Data</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* CHART */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm h-[400px]"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Traffic Overview</h3>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={stats}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                                    cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }}
                                />
                                <Bar dataKey="views" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* 3. RECENT ACTIVITY LOG (Mobile Responsive) */}
                    <div className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Recent Activity</h3>
                        
                        {/* Tambahkan 'overflow-x-auto' agar tabel bisa digeser di HP */}
                        <div className="overflow-x-auto"> 
                            <table className="w-full text-sm text-left whitespace-nowrap"> {/* whitespace-nowrap agar teks tidak turun baris berantakan */}
                                <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-900/50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Time</th>
                                        <th className="px-4 py-3">Page Visited</th>
                                        <th className="px-4 py-3 rounded-r-lg">Device</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLogs.map((log) => (
                                        <tr key={log.id} className="border-b border-zinc-100 dark:border-white/5 last:border-0 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-mono text-zinc-600 dark:text-zinc-400">
                                                {formatDate(log.created_at)}
                                            </td>
                                            <td className="px-4 py-3 font-bold text-cyan-600 dark:text-cyan-400">
                                                {log.page_path}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.device_type === 'Mobile' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'}`}>
                                                    {log.device_type || 'Desktop'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
  );
}