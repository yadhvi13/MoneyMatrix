import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96">
        <Search className="w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search transactions, insights..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/20"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-white/60 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-black"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-white/40 capitalize">{user?.role}</p>
          </div>
          <img 
            src={user?.avatar} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg"
          />
        </div>
      </div>
    </header>
  );
};
