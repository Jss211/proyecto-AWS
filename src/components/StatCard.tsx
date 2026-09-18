import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

// Componente presentacional (dumb component) para mostrar métricas clave
export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => {
  return (
    <div className="bg-cards rounded-2xl shadow-sm border border-bordes p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-texto-secundario text-sm font-semibold uppercase tracking-wider">{title}</h3>
        <div className="text-principal">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-texto-principal mb-1">{value}</p>
      {description && <p className="text-sm text-texto-secundario">{description}</p>}
    </div>
  );
};
