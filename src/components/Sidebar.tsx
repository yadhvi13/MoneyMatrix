import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Lightbulb, Settings, LogOut, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ReceiptText, label: 'Transactions', path: '/transactions' },
  { icon: Lightbulb, label: 'Insights', path: '/insights' },
];

export const Sidebar: React.FC = () => {
  const { role, setRole } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-black/20 backdrop-blur-2xl z-50 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/50">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          FinVision Pro
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              isActive 
                ? "bg-white/10 text-white shadow-lg border border-white/10" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-3">Role Switcher</p>
          <div className="flex bg-black/20 rounded-lg p-1">
            <button
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 text-xs py-1.5 rounded-md transition-all",
                role === 'admin' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
              )}
            >
              Admin
            </button>
            <button
              onClick={() => setRole('viewer')}
              className={cn(
                "flex-1 text-xs py-1.5 rounded-md transition-all",
                role === 'viewer' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
              )}
            >
              Viewer
            </button>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
