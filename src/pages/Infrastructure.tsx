import React from 'react';
import { Globe, MapPin, Server, ShieldCheck, Map, Cloud } from 'lucide-react';
import { globalRegions } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const Infrastructure: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* CABECERA PRINCIPAL */}
      <div>
        <h1 className="text-2xl font-bold text-texto-principal">Infraestructura Global</h1>
      </div>

      {/* TARJETAS DE REGIONES (Cumplimiento de los 4 puntos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {globalRegions.map((region) => (
          <div key={region.id} className="bg-cards border border-bordes rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
            
            {/* Cabecera de la Tarjeta */}
            <div className="bg-fondo border-b border-bordes p-5 flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 text-principal">
                <Map size={20} />
              </div>
              <h3 className="font-bold text-texto-principal text-lg">Centro de Datos</h3>
            </div>

            {/* Contenido (Los 4 Puntos del PDF) */}
            <div className="p-6 space-y-5">
              
              {/* 1. Región */}
              <div>
                <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Cloud size={14} /> Región AWS
                </span>
                <p className="font-bold text-texto-principal text-lg">{region.name}</p>
              </div>

              {/* 2. Ubicación */}
              <div>
                <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider flex items-center gap-1 mb-1">
                  <MapPin size={14} /> Ubicación Geográfica
                </span>
                <p className="font-semibold text-texto-principal">{region.location}</p>
              </div>

              {/* 3. Servicios Desplegados */}
              <div>
                <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Server size={14} /> Servicios Desplegados
                </span>
                <div className="flex flex-wrap gap-2">
                  {region.deployedServices.map((service, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 bg-blue-50 text-principal border border-blue-200 rounded-md text-xs font-bold shadow-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Estado */}
              <div className="pt-4 border-t border-bordes flex items-center justify-between">
                <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={14} /> Estado Actual
                </span>
                <StatusBadge status={region.status} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
