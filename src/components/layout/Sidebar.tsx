import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, DollarSign, Globe, Shield, Network, Server, Moon, Sun, Cloud } from 'lucide-react';

interface SidebarProps {
  onNavClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/planning', label: 'Planificación', icon: <Target size={20} /> },
    { path: '/costs', label: 'Costos', icon: <DollarSign size={20} /> },
    { path: '/infrastructure', label: 'Infraestructura', icon: <Globe size={20} /> },
    { path: '/security', label: 'Seguridad', icon: <Shield size={20} /> },
    { path: '/network', label: 'Red', icon: <Network size={20} /> },
    { path: '/services', label: 'Servicios', icon: <Server size={20} /> },
  ];

  return (
    <aside className="w-64 bg-sidebar text-white min-h-screen flex flex-col h-full overflow-y-auto relative border-r border-white/10">
      <div className="p-6 flex items-center gap-3 mt-2">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 border border-blue-400/20">
          <Cloud size={24} className="text-white fill-white/20" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">CloudOps</h1>
      </div>
      <nav className="flex-1 mt-2 flex flex-col">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onNavClick}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 transition-colors ${
                    isActive ? 'bg-principal text-white font-bold border-r-4 border-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* BOTON MODO OSCURO / CLARO */}
        <div className="mt-auto p-4 mb-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-[#1e293b]/60 border border-[#334155] text-slate-300 hover:bg-[#1e293b] hover:text-white transition-all shadow-sm"
          >
            {isDarkMode ? (
              <>
                <Sun size={18} className="mr-2 text-yellow-400" />
                <span className="text-sm font-semibold tracking-wide">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon size={18} className="mr-2 text-blue-400" />
                <span className="text-sm font-semibold tracking-wide">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
};
