import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/src/lib/firebase';
import { CATEGORIES } from '@/src/data/tools';
import { 
  Eye, BarChart2, TrendingUp, Users, 
  LogOut, RefreshCw, ChevronRight, Wrench
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, 
  BarChart, Bar, CartesianGrid
} from 'recharts';
import { format, startOfDay, subDays, isSameDay } from 'date-fns';

// Types
interface Pageview {
  id: string;
  toolId: string;
  categoryId: string;
  path: string;
  timestamp: Timestamp;
  userAgent: string;
}

const CATEGORY_COLORS = ['#0066cc', '#00d4ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444'];

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Pageview[]>([]);
  const [toolStats, setToolStats] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [recentVisits, setRecentVisits] = useState<Pageview[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'pageviews'), orderBy('timestamp', 'desc'), limit(1000));
      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pageview));
      
      setData(fetchedData);
      processStats(fetchedData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const processStats = (raw: Pageview[]) => {
    // 1. Tool Counts
    const toolCounts: Record<string, number> = {};
    raw.forEach(p => {
      toolCounts[p.toolId] = (toolCounts[p.toolId] || 0) + 1;
    });

    const sortedTools = Object.entries(toolCounts)
      .map(([id, count]) => {
        // Find tool name from CATEGORIES
        let name = id;
        let catName = 'Unknown';
        for (const cat of CATEGORIES) {
          const t = cat.tools.find(tool => tool.id === id);
          if (t) {
            name = t.name;
            catName = cat.name;
            break;
          }
        }
        return { name, category: catName, views: count, percentage: (count / raw.length * 100).toFixed(1) };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);
    
    setToolStats(sortedTools);

    // 2. Category Pie Chart
    const catCounts: Record<string, number> = {};
    raw.forEach(p => {
      const cat = CATEGORIES.find(c => c.id === p.categoryId)?.name || 'Other';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    setCategoryData(Object.entries(catCounts).map(([name, value]) => ({ name, value })));

    // 3. Trend Chart (last 30 days)
    const last30Days = Array.from({ length: 30 }).map((_, i) => subDays(new Date(), i)).reverse();
    const trend = last30Days.map(date => {
      const dayStart = startOfDay(date);
      const views = raw.filter(p => isSameDay(p.timestamp.toDate(), dayStart)).length;
      return { date: format(date, 'MMM dd'), views };
    });

    setTrendData(trend);

    // 4. Recent visits
    setRecentVisits(raw.slice(0, 20));
  };

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <RefreshCw className="w-10 h-10 animate-spin text-[#0066cc] mb-4" />
        <p className="text-gray-400">Loading Analytics Data...</p>
      </div>
    );
  }

  const todayViews = data.filter(p => isSameDay(p.timestamp.toDate(), new Date())).length;
  const avgViews = (data.length / Math.max(1, trendData.length)).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1a1a2e] p-6 rounded-xl border border-[#0066cc]/20 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ToolStudio Admin <span className="text-[#0066cc]">Dashboard</span></h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">Logged in as: {auth.currentUser?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-[#16213e] hover:bg-[#1a1a2e] border border-gray-700 rounded-lg text-xs font-bold transition-all text-gray-300"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pageviews" value={data.length} subtitle="All time" icon={Eye} color="from-blue-600 to-blue-400" />
        <StatCard title="Today's Views" value={todayViews} subtitle="Last 24 hours" icon={BarChart2} color="from-green-600 to-green-400" />
        <StatCard title="Average Daily" value={avgViews} subtitle="30-day average" icon={TrendingUp} color="from-purple-600 to-purple-400" />
        <StatCard title="Active Categories" value={categoryData.length} subtitle="Tool segments" icon={Users} color="from-orange-600 to-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Tools */}
        <div className="lg:col-span-2 bg-[#1a1a2e] rounded-xl border border-[#0066cc]/10 shadow-lg p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0066cc]" />
            Top Performing Tools
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800">
                  <th className="pb-4 font-bold">Tool Name</th>
                  <th className="pb-4 font-bold">Category</th>
                  <th className="pb-4 font-bold text-right">Views</th>
                  <th className="pb-4 font-bold text-right">Share</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {toolStats.map((tool, i) => (
                  <tr key={tool.name} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors group">
                    <td className="py-4 text-white font-medium">{tool.name}</td>
                    <td className="py-4">
                      <span className="text-[10px] bg-[#16213e] px-2 py-1 rounded text-[#00d4ff] font-bold uppercase tracking-tight">
                        {tool.category}
                      </span>
                    </td>
                    <td className="py-4 text-right font-mono text-[#00d4ff]">{tool.views}</td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-gray-500 text-[11px]">{tool.percentage}%</span>
                        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0066cc]" style={{ width: `${tool.percentage}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0066cc]/10 shadow-lg p-6 flex flex-col">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#00d4ff]" />
            Category Distribution
          </h3>
          <div className="flex-grow min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0066cc', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}></div>
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-white font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Graph */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0066cc]/10 shadow-lg p-6">
        <h3 className="text-white font-bold mb-8 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#a855f7]" />
          Traffic Trend (Last 30 Days)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" vertical={false} />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0066cc', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#0066cc" 
                strokeWidth={3} 
                dot={{ stroke: '#00d4ff', strokeWidth: 2, r: 4, fill: '#1a1a2e' }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#1a1a2e] rounded-xl border border-[#0066cc]/10 shadow-lg p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#ef4444]" />
            Live Activity Log
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {recentVisits.map((visit, i) => (
              <div key={visit.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#16213e]/50 border border-gray-800 hover:border-[#0066cc]/30 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#00d4ff] text-[10px] shrink-0 border border-gray-700">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white">Visited {visit.toolId}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{format(visit.timestamp.toDate(), 'HH:mm:ss')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#0066cc] font-bold uppercase tracking-wider">{visit.categoryId}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-[10px] text-gray-500 font-mono truncate max-w-md">{visit.path}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Browser Stats (derived from User Agent) */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0066cc]/10 shadow-lg p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#f59e0b]" />
            Device Distribution
          </h3>
          {/* Placeholder for device/browser charts using data processing */}
          <div className="space-y-6">
             <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
               <p className="text-xs text-yellow-500 font-bold mb-1 uppercase tracking-widest">Admin Tip</p>
               <p className="text-xs text-gray-400 leading-relaxed italic">"Try adding custom tool parameters to your URL to track specific marketing campaigns."</p>
             </div>
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Links</p>
               <div className="flex flex-wrap gap-2 text-[10px]">
                 <span className="px-2 py-1 bg-[#16213e] rounded border border-gray-700 text-white">Export CSV</span>
                 <span className="px-2 py-1 bg-[#16213e] rounded border border-gray-700 text-white">GA Dashboard</span>
                 <span className="px-2 py-1 bg-[#16213e] rounded border border-gray-700 text-white">User Support</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className={`p-6 rounded-xl bg-[#1a1a2e] border border-[#0066cc]/10 shadow-lg relative overflow-hidden group`}>
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 -translate-y-8 translate-x-8 rounded-full blur-2xl group-hover:opacity-10 transition-all duration-500`}></div>
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-[11px] text-gray-400">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg shadow-black/20`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);
