import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { GlassCard } from '../components/GlassCard';
import { formatCurrency } from '../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const Dashboard: React.FC = () => {
  const { summary, transactions } = useFinance();

  const chartData = transactions.slice(0, 7).reverse().map(t => ({
    name: t.date,
    amount: t.amount,
    type: t.type
  }));

  const categoryData = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Financial Overview</h2>
          <p className="text-white/40">Welcome back! Here's what's happening with your money.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/40">Total Balance</p>
          <p className="text-4xl font-black text-white tracking-tight">
            {formatCurrency(summary.totalBalance)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <DollarSign className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/40">Total Balance</p>
              <p className="text-xl font-bold text-white">{formatCurrency(summary.totalBalance)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <TrendingUp className="text-emerald-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/40">Income</p>
              <p className="text-xl font-bold text-white">{formatCurrency(summary.totalIncome)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-rose-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 rounded-xl">
              <TrendingDown className="text-rose-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/40">Expenses</p>
              <p className="text-xl font-bold text-white">{formatCurrency(summary.totalExpenses)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-amber-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <PiggyBank className="text-amber-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/40">Savings Rate</p>
              <p className="text-xl font-bold text-white">{summary.savingsRate.toFixed(1)}%</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 h-[400px]" hover={false}>
          <h3 className="text-lg font-semibold text-white mb-6">Balance Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="h-[400px]" hover={false}>
          <h3 className="text-lg font-semibold text-white mb-6">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};
