import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, Legend 
} from 'recharts';
import { 
  Wallet, TrendingUp, Landmark, 
  Calendar, Clock, DollarSign 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SalaryData {
  gross: number;
  net: number;
  tax: number;
  taxRate: number;
  breakdown: {
    name: string;
    value: number;
    color: string;
  }[];
  averages: {
    ratio: number;
    country: string;
  };
}

interface Props {
  data: SalaryData;
}

const COLORS = ['#0066cc', '#ef4444', '#f59e0b', '#10b981'];

export const SalaryResult: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: 'Net Income', value: data.net },
    { name: 'Taxes & Deductions', value: data.tax },
  ];

  const payPeriods = [
    { label: 'Yearly', value: data.net, icon: Calendar, sub: 'Annual take-home' },
    { label: 'Monthly', value: data.net / 12, icon: Clock, sub: 'Average per month' },
    { label: 'Weekly', value: data.net / 52, icon: Wallet, sub: 'Average per week' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Pay Period Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {payPeriods.map((period, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-[#0066cc]">
                <period.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {period.label}
              </span>
            </div>
            <p className="text-2xl font-black text-[#1a1a2e]">
              ${period.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-500 mt-1">{period.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-lg font-bold text-[#1a1a2e] mb-2 text-center">Income Utilization</h3>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-8">Tax vs Net Savings</p>
          
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0066cc' : '#ef4444'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="text-3xl font-black text-[#1a1a2e]">{data.taxRate.toFixed(1)}%</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Effective Tax Rate</p>
          </div>
        </div>

        {/* Comparison & Breakdown */}
        <div className="space-y-6">
          <div className="bg-[#1a1a2e] p-8 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24" />
            </div>
            <div className="relative z-10 text-center">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d4ff] mb-4">Comparison Insight</h4>
              <p className="text-3xl font-black mb-2">
                {data.averages.ratio.toFixed(1)}x Average
              </p>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Compared to the median salary in <span className="text-white font-bold">{data.averages.country}</span>.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Tax Breakdown
            </h3>
            <div className="space-y-4">
              {data.breakdown.map((item, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#1a1a2e]">{item.name}</span>
                    <span className="font-mono text-gray-500">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / data.gross) * 100}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-[#1a1a2e] uppercase tracking-tight">Total Deductions</span>
                  <span className="text-lg font-black text-red-500">-${data.tax.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
