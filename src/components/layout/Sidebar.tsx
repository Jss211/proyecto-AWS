import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, DollarSign, Globe, Shield, Network, Server } from 'lucide-react';

interface SidebarProps {
  onNavClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavClick }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/planning', label: 'Planificación', icon: <Target size={20} /> },
    { path: '/costs', label: 'Costos', icon: <DollarSign size={20} /> },
    { path: '/infrastructure', label: 'Infraestructura', icon: <Globe size={20} /> },
    { path: '/security', label: 'Seguridad', icon: <Shield size={20} />, dev: true },
    { path: '/network', label: 'Red', icon: <Network size={20} />, dev: true },
    { path: '/services', label: 'Servicios', icon: <Server size={20} />, dev: true },
  ];

  return (
    <aside className="w-64 bg-sidebar text-white min-h-screen flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider">CloudOps</h1>
      </div>
      <nav className="flex-1 mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onNavClick}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 transition-colors ${
                    isActive ? 'bg-principal text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </div>
                  {item.dev && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300 px-2 py-0.5 rounded ml-2">Próx</span>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
