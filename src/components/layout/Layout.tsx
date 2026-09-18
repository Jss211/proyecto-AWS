import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Menu, X } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-fondo">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative z-50 w-64 h-full flex-shrink-0 shadow-2xl transition-transform transform translate-x-0">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white z-50">
               <X size={24} />
            </button>
            <Sidebar onNavClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header dinámico (Móvil vs Desktop) */}
        <div className="md:hidden flex items-center bg-white border-b border-bordes p-4 shadow-sm z-40">
          <button className="text-slate-600 hover:text-principal transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
             <Menu size={28} />
          </button>
          <div className="flex-1 text-center font-black text-xl text-slate-800 tracking-tight">CloudOps <span className="text-principal">.</span></div>
          <div className="w-7"></div> {/* Spacer para centrar el título */}
        </div>
        
        <div className="hidden md:block">
          <Header />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
