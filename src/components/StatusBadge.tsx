import React from 'react';

interface StatusBadgeProps {
  status: 'Verde' | 'Amarillo' | 'Rojo' | 'Activo' | 'Inactivo' | 'En uso' | 'Disponible' | 'Operativa' | 'Degradada' | 'Caída' | 'Saludable' | 'En Riesgo' | 'Crítico' | string;
}

// Componente centralizado para pintar estados con sus respectivos colores, evitando duplicar lógicas en las páginas.
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  // Lógica de mapeo de estado a color de Tailwind
  if (['Verde', 'Activo', 'En uso', 'Operativa', 'Saludable', 'A salvo'].includes(status)) {
    bgColor = 'bg-green-100';
    textColor = 'text-seguridad';
  } else if (['Amarillo', 'Disponible', 'Degradada', 'En Riesgo'].includes(status)) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-costos';
  } else if (['Rojo', 'Inactivo', 'Caída', 'Crítico'].includes(status)) {
    bgColor = 'bg-red-100';
    textColor = 'text-alertas';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};
