import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-cards border-b border-bordes h-16 flex items-center px-6 shadow-sm">
      <h2 className="text-lg font-semibold text-texto-principal">Panel de Administración Cloud</h2>
      <div className="ml-auto">
        <span className="text-sm font-medium text-texto-secundario">Administrador</span>
      </div>
    </header>
  );
};
