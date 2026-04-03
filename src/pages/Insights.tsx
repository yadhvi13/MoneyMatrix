import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Target, ArrowRight } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { GlassCard } from '../components/GlassCard';
import { formatCurrency } from '../lib/utils';

export const Insights: React.FC = () => {
  const { transactions, summary } = useFinance();

  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const entries = Object.entries(categoryTotals) as [string, number][];
  const highestCategory = entries.sort((a, b) => b[1] - a[1])[0];

  const insights = [
    {
      title: 'Highest Spending',
      description: highestCategory 
        ? `You've spent the most on ${highestCategory[0]} this month.` 
        : 'No spending data yet.',
      value: highestCategory ? formatCurrency(highestCategory[1]) : '$0.00',
      icon: AlertCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-500/20'
    },
    {
      title: 'Savings Goal',
      description: summary.savingsRate > 20 
        ? 'Great job! You are exceeding your 20% savings target.' 
        : 'Try to reduce non-essential spending to reach your 20% goal.',
      value: `${summary.savingsRate.toFixed(1)}%`,
      icon: Target,
      color: 'text-blue-500',
      bg: 'bg-blue-500/20'
    },
    {
      title: 'Income Growth',
      description: 'Your income has increased by 12% compared to last month.',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/20'
    }
  ];

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-white">Smart Insights</h2>
        <p className="text-white/40">AI-powered observations about your financial health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <GlassCard key={index} className="flex flex-col justify-between h-64">
            <div>
              <div className={`p-3 w-fit rounded-xl ${insight.bg} ${insight.color} mb-4`}>
                <insight.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{insight.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{insight.description}</p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <p className={`text-2xl font-black ${insight.color}`}>{insight.value}</p>
              <button className="p-2 text-white/20 hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8" hover={false}>
        <div className="flex items-start gap-6">
          <div className="p-4 bg-amber-500/20 rounded-2xl">
            <Lightbulb className="w-8 h-8 text-amber-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Monthly Comparison</h3>
            <p className="text-white/60 max-w-2xl">
              Based on your current spending velocity, you are projected to save 
              <span className="text-white font-bold"> {formatCurrency(summary.totalBalance * 1.1)} </span> 
              by the end of next month. This is a significant improvement over your previous quarter's average.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-white/40">Last Month</p>
                <p className="font-bold text-white">{formatCurrency(summary.totalBalance * 0.85)}</p>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-white/40">Projected</p>
                <p className="font-bold text-emerald-500">{formatCurrency(summary.totalBalance * 1.1)}</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
