import React, { useState, useEffect } from 'react';
import type { CloudProposal } from '../types/cloud';
import { Save, Server, Globe, Shield, Activity, Target, AlignJustify, LayoutGrid, Check } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Planning: React.FC = () => {
  const [proposals, setProposals] = useState<CloudProposal[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  
  // Estados del Formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState('Web Corporativa');
  const [region, setRegion] = useState('us-east-1');
  const [availability, setAvailability] = useState('99.9% (Normal)');
  const [users, setUsers] = useState('1000');
  const [goal, setGoal] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cloudProposals');
    if (saved) setProposals(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    if (!name || selectedServices.length === 0) {
      alert("Por favor ingresa un nombre y selecciona al menos un servicio.");
      return;
    }
    
    const newProposal: CloudProposal = {
      id: `prop-${Date.now()}`,
      name,
      description,
      appType,
      region,
      availability,
      estimatedUsers: parseInt(users) || 0,
      migrationGoal: goal || 'No especificado',
      services: selectedServices,
      status: availability.includes('99.999') ? 'Crítico' : 'Saludable'
    };

    const updated = [...proposals, newProposal];
    setProposals(updated);
    localStorage.setItem('cloudProposals', JSON.stringify(updated));
    
    setName(''); setDescription(''); setGoal(''); setSelectedServices([]);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-texto-principal">Planificación de Arquitectura</h1>
        <p className="text-texto-secundario">Diseña y guarda propuestas técnicas definiendo todos los parámetros requeridos.</p>
      </div>

      {/* SECCIÓN 1: FORMULARIO DE DISEÑO */}
      <div className="bg-white border border-bordes rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-principal border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
          <Activity size={20} /> Creador de Propuestas Cloud
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-texto-principal mb-1">Nombre del Proyecto *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Migración ERP" className="w-full bg-fondo border border-bordes rounded-lg p-2.5 outline-none focus:border-principal text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-texto-principal mb-1">Descripción Detallada</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Propósito de la infraestructura..." className="w-full bg-fondo border border-bordes rounded-lg p-2.5 outline-none focus:border-principal text-sm h-24 resize-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-texto-principal mb-1">Tipo de App</label>
                <select value={appType} onChange={(e) => setAppType(e.target.value)} className="w-full bg-fondo border border-bordes rounded-lg p-2.5 text-sm">
                  <option>Web Corporativa</option><option>E-commerce</option><option>Backend API</option><option>Big Data</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-texto-principal mb-1">Tráfico Estimado</label>
                <input type="number" value={users} onChange={(e) => setUsers(e.target.value)} className="w-full bg-fondo border border-bordes rounded-lg p-2.5 text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-texto-principal mb-1">Región de Despliegue</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-fondo border border-bordes rounded-lg p-2.5 text-sm">
                  <option>us-east-1 (Virginia)</option><option>eu-west-1 (Irlanda)</option><option>sa-east-1 (São Paulo)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-texto-principal mb-1">Disponibilidad (SLA)</label>
                <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full bg-fondo border border-bordes rounded-lg p-2.5 text-sm">
                  <option>99.9% (Normal)</option><option>99.99% (Alta)</option><option>99.999% (Crítica)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-texto-principal mb-1">Objetivo del Proyecto</label>
              <input 
                type="text" 
                list="goal-options" 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)} 
                placeholder="Ej: Reducción de costos, Escribir..."
                className="w-full bg-fondo border border-bordes rounded-lg p-2.5 text-sm outline-none focus:border-principal" 
              />
              <datalist id="goal-options">
                <option value="Reducción de Costos" />
                <option value="Migración a la Nube" />
                <option value="Alta Disponibilidad" />
                <option value="Modernización de App" />
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-bold text-texto-principal mb-2">Selección de Servicios (Componentes) *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'ec2', name: 'Amazon EC2', icon: Server, desc: 'Servidores virtuales escalables' },
                  { id: 's3', name: 'Amazon S3', icon: Globe, desc: 'Almacenamiento de objetos' },
                  { id: 'rds', name: 'Amazon RDS', icon: Server, desc: 'Base de datos relacional' },
                  { id: 'iam', name: 'AWS IAM', icon: Shield, desc: 'Control de identidades y acceso' },
                  { id: 'vpc', name: 'Amazon VPC', icon: Globe, desc: 'Red virtual privada y aislada' }
                ].map(srv => {
                  const isSelected = selectedServices.includes(srv.name);
                  return (
                  <label key={srv.id} className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleService(srv.name)} />
                        <srv.icon size={16} className={isSelected ? 'text-blue-600' : 'text-slate-500'} /> 
                        <span className="text-sm font-bold text-texto-principal">{srv.name}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-blue-600" />}
                    </div>
                    <p className={`text-xs pl-6 leading-tight ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                      {srv.desc}
                    </p>
                  </label>
                )})}
              </div>
            </div>

            <button onClick={handleSave} className="w-full mt-4 bg-principal hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Save size={18} /> Guardar Propuesta Arquitectónica
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: PORTAFOLIO DE ARQUITECTURAS */}
      <div className="bg-white border border-bordes rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold text-principal flex items-center gap-2">
            <Target size={20} /> Portafolio de Arquitecturas Guardadas
          </h2>
          
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode('cards')} 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'cards' ? 'bg-white text-principal shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={16} /> Tarjetas
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white text-principal shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <AlignJustify size={16} /> Tabla Completa
            </button>
          </div>
        </div>

        {proposals.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p>No hay propuestas guardadas.</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((prop) => (
              <div key={prop.id} className="border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-texto-principal">{prop.name}</h3>
                    <StatusBadge status={prop.status || 'Saludable'} />
                  </div>
                  <p className="text-sm text-texto-secundario mb-4 line-clamp-2">{prop.description || 'Sin descripción.'}</p>
                  
                  <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-lg text-xs">
                    <div className="flex justify-between"><span className="font-semibold text-slate-500">Objetivo:</span> <span className="font-bold text-slate-700 max-w-[120px] truncate">{prop.migrationGoal}</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-slate-500">Región:</span> <span className="font-bold text-slate-700">{prop.region}</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-slate-500">SLA:</span> <span className="font-bold text-slate-700">{prop.availability}</span></div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-1">SERVICIOS INCLUIDOS:</p>
                  <div className="flex flex-wrap gap-1">
                    {prop.services.map(s => (
                      <span key={s} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-bold">Proyecto</th>
                  <th className="px-4 py-3 font-bold">Descripción</th>
                  <th className="px-4 py-3 font-bold">Objetivo</th>
                  <th className="px-4 py-3 font-bold text-center">Tipo</th>
                  <th className="px-4 py-3 font-bold text-center">Región</th>
                  <th className="px-4 py-3 font-bold text-center">SLA</th>
                  <th className="px-4 py-3 font-bold text-center">Usuarios</th>
                  <th className="px-4 py-3 font-bold">Servicios</th>
                  <th className="px-4 py-3 font-bold text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {proposals.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-principal whitespace-nowrap">{prop.name}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[150px] truncate" title={prop.description}>{prop.description || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700 max-w-[120px] truncate" title={prop.migrationGoal}>{prop.migrationGoal}</td>
                    <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{prop.appType}</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">{prop.region}</td>
                    <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{prop.availability}</td>
                    <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{prop.estimatedUsers}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 w-32">
                        {prop.services.map(s => (
                           <span key={s} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={prop.status || 'Saludable'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
