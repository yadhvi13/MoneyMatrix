
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Lightbulb, LogOut, Wallet } from 'lucide-react';
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
    <aside className="fixed left-0 top-0 h-screen w-64 
      border-r border-black/10 dark:border-white/10 
      bg-white/70 dark:bg-black/40 
      backdrop-blur-2xl z-50 flex flex-col p-6 transition-colors duration-300"
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/50">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold 
          bg-gradient-to-r from-black to-black/60 
          dark:from-white dark:to-white/60 
          bg-clip-text text-transparent">
          FinVision Pro
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              isActive 
                ? "bg-black/10 dark:bg-white/10 text-black dark:text-white shadow-md border border-black/10 dark:border-white/10"
                : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ROLE SWITCHER */}
      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl 
          bg-black/5 dark:bg-white/5 
          border border-black/10 dark:border-white/10"
        >
          <p className="text-xs 
            text-black/40 dark:text-white/40 
            uppercase tracking-wider font-bold mb-3"
          >
            Role Switcher
          </p>

          <div className="flex bg-black/10 dark:bg-black/30 rounded-lg p-1">
            <button
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 text-xs py-1.5 rounded-md transition-all",
                role === 'admin'
                  ? "bg-black/10 dark:bg-white/10 text-black dark:text-white shadow-sm"
                  : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
              )}
            >
              Admin
            </button>

            <button
              onClick={() => setRole('viewer')}
              className={cn(
                "flex-1 text-xs py-1.5 rounded-md transition-all",
                role === 'viewer'
                  ? "bg-black/10 dark:bg-white/10 text-black dark:text-white shadow-sm"
                  : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
              )}
            >
              Viewer
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl 
          text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};