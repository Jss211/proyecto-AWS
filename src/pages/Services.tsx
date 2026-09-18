import React from 'react';
import { Server, HardHat } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-6">
      <div className="bg-slate-100 p-8 rounded-full text-slate-300 relative">
        <Server size={64} />
        <div className="absolute -bottom-2 -right-2 bg-blue-100 text-blue-600 p-2 rounded-full border-4 border-white">
          <HardHat size={24} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Catálogo de Servicios</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          El catálogo de integración técnica con los SDK de AWS se encuentra actualmente en desarrollo y producción por el equipo de ingeniería.
        </p>
      </div>
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        En Producción
      </div>
    </div>
  );
};
