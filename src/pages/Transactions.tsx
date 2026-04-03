import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { CATEGORIES } from '../data/mockData';

export const Transactions: React.FC = () => {
  const { transactions, deleteTransaction, addTransaction } = useFinance();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddSample = () => {
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 500) + 50,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      type: Math.random() > 0.5 ? 'income' : 'expense',
      description: 'New Transaction ' + Math.floor(Math.random() * 100)
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Transactions</h2>
          <p className="text-white/40">Manage and track your financial activities.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={handleAddSample}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        )}
      </div>

      <GlassCard className="p-4" hover={false}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {(['all', 'income', 'expense'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
                    filterType === type ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-white/40">
            Showing {filteredTransactions.length} transactions
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <GlassCard key={t.id} className="p-4 hover:scale-[1.005]" hover={false}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    t.type === 'income' ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
                  )}>
                    {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.description}</p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>{t.date}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-white/5 rounded-full">{t.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className={cn(
                    "text-lg font-bold",
                    t.type === 'income' ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </p>
                  {isAdmin && (
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="p-2 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white/5 rounded-full mb-4">
              <Search className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-xl font-semibold text-white">No transactions found</h3>
            <p className="text-white/40">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};
