import React, { useEffect, useState } from 'react';
import { Server, DollarSign, ShieldAlert, Activity, MapPin, Database, Target, Cloud, Bell, ChevronDown, Loader2 } from 'lucide-react';
import { securityStatus } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { CloudProposal } from '../types/cloud';
import { StatusBadge } from '../components/StatusBadge';

const AWS_REGIONS = [
  { id: 'us-east-1', name: 'N. Virginia' },
  { id: 'eu-west-1', name: 'Irlanda' },
  { id: 'sa-east-1', name: 'São Paulo' },
];

export const Dashboard: React.FC = () => {
  const [proposals, setProposals] = useState<CloudProposal[]>([]);
  
  // Base states to keep original calculation from localStorage
  const [baseCosts, setBaseCosts] = useState({ monthly: 2850, annual: 34200 });
  const [baseServiceCount, setBaseServiceCount] = useState(6);
  
  // Current displayed states
  const [costs, setCosts] = useState({ monthly: 2850, annual: 34200 });
  const [serviceCount, setServiceCount] = useState(6);
  const [region, setRegion] = useState(AWS_REGIONS[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [chartData, setChartData] = useState([
    { name: 'Cómputo', valor: 45 },
    { name: 'BD', valor: 25 },
    { name: 'Red', valor: 20 },
    { name: 'Seguridad', valor: 10 },
  ]);

  useEffect(() => {
    // Cargar propuestas guardadas
    const saved = localStorage.getItem('cloudProposals');
    if (saved) {
      setProposals(JSON.parse(saved));
    }

    // Sincronizar costos desde el módulo de Costos
    const savedCosts = localStorage.getItem('cloudCosts');
    if (savedCosts) {
      const parsedCosts = JSON.parse(savedCosts);
      const totalMensual = parsedCosts.reduce((acc: any, item: any) => acc + item.monthlyCost, 0);
      const totalAnual = parsedCosts.reduce((acc: any, item: any) => acc + item.annualCost, 0);
      setBaseCosts({ monthly: totalMensual, annual: totalAnual });
      setCosts({ monthly: totalMensual, annual: totalAnual });
      setBaseServiceCount(parsedCosts.length);
      setServiceCount(parsedCosts.length);
    }
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = AWS_REGIONS.find(r => r.id === e.target.value) || AWS_REGIONS[0];
    setRegion(selected);
    setIsUpdating(true);
    
    // Simulate data fetch and update for the selected region
    setTimeout(() => {
      const isDefault = selected.id === 'us-east-1';
      // If default, restore original data, else create a multiplier to simulate different region stats
      const multiplier = isDefault ? 1 : 0.6 + Math.random() * 0.8; 
      
      setChartData([
        { name: 'Cómputo', valor: Math.floor(45 * multiplier) },
        { name: 'BD', valor: Math.floor(25 * (isDefault ? 1 : (0.5 + Math.random()))) },
        { name: 'Red', valor: Math.floor(20 * multiplier) },
        { name: 'Seguridad', valor: Math.floor(10 * multiplier) },
      ]);
      
      setCosts({
        monthly: Math.floor(baseCosts.monthly * multiplier),
        annual: Math.floor(baseCosts.annual * multiplier)
      });
      setServiceCount(isDefault ? baseServiceCount : Math.max(1, Math.floor(baseServiceCount * multiplier)));
      
      setIsUpdating(false);
    }, 600);
  };

  const issuesCount = securityStatus.filter(s => s.status === 'Rojo' || s.status === 'Amarillo').length;
  
  return (
    <div className="space-y-6">
      {/* CABECERA PRINCIPAL */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-texto-principal flex items-center gap-3">
          Centro de Mando Cloud
          {isUpdating && <Loader2 size={20} className="animate-spin text-principal" />}
        </h1>
      </div>

      {/* SECCIÓN 1: INDICADORES GLOBALES */}
      <section className="space-y-4">
        {/* Fila 1: 4 Cuadros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-2 text-texto-secundario">
                <Server size={18} className="text-principal" /> <span className="text-xs font-bold uppercase tracking-wider">Servicios Utilizados</span>
              </div>
              <p className="text-2xl font-bold text-texto-principal">{serviceCount} <span className="text-sm text-texto-secundario font-medium">Servicios</span></p>
            </div>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-texto-secundario">
                <MapPin size={18} className="text-purple-600" /> 
                <span className="text-xs font-bold uppercase tracking-wider">Región</span>
              </div>
            </div>
            
            <div className="relative mt-1">
              <div className="flex items-center justify-between text-2xl font-bold text-texto-principal group-hover:text-principal transition-colors">
                <span className="truncate pr-2">{region.id}</span>
                <ChevronDown size={20} className="text-texto-secundario group-hover:text-principal transition-colors" />
              </div>
              
              <select 
                value={region.id}
                onChange={handleRegionChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              >
                {AWS_REGIONS.map(r => (
                  <option key={r.id} value={r.id} className="text-base text-texto-principal">{r.id} ({r.name})</option>
                ))}
              </select>
            </div>
            <p className="text-xs font-semibold text-texto-secundario mt-1 transition-colors">{region.name}</p>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-2 text-texto-secundario">
                <DollarSign size={18} className="text-seguridad" /> <span className="text-xs font-bold uppercase tracking-wider">Mensual Estimado</span>
              </div>
              <p className="text-2xl font-bold text-texto-principal">${costs.monthly.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-2 text-texto-secundario">
                <DollarSign size={18} className="text-green-600" /> <span className="text-xs font-bold uppercase tracking-wider">Anual Estimado</span>
              </div>
              <p className="text-2xl font-bold text-texto-principal">${costs.annual.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Fila 2: 3 Cuadros Restantes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`p-5 rounded-2xl shadow-sm border transition-colors ${issuesCount > 0 ? 'bg-red-50 border-red-200' : 'bg-cards border-bordes'}`}>
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <ShieldAlert size={18} className={issuesCount > 0 ? "text-alertas" : "text-seguridad"} /> 
              <span className="text-xs font-bold uppercase tracking-wider">Estado de Seguridad</span>
            </div>
            <p className={`text-2xl font-bold ${issuesCount > 0 ? 'text-alertas' : 'text-texto-principal'}`}>
              {issuesCount > 0 ? `${issuesCount} Vulnerabilidades` : 'Óptimo'}
            </p>
            <p className={`text-xs font-semibold mt-1 ${issuesCount > 0 ? 'text-red-500' : 'text-texto-secundario'}`}>Revisión de IAM requerida</p>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <Database size={18} className="text-orange-500" /> <span className="text-xs font-bold uppercase tracking-wider">VPC y Componentes</span>
            </div>
            <p className="text-2xl font-bold text-texto-principal">EC2, RDS, S3, VPC</p>
            <p className="text-xs font-semibold text-texto-secundario mt-1">Recursos Cloud en topología</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-white border border-bordes p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <Target size={18} className="text-principal" /> <span className="text-xs font-bold uppercase tracking-wider">Estado de la Arquitectura</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-seguridad">Saludable</p>
              <StatusBadge status="Verde" />
            </div>
            <p className="text-xs font-semibold text-texto-secundario mt-1">SLA Activo: 99.99% (Alta Disponibilidad)</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: GRÁFICOS Y TABLAS */}
      <section className="space-y-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <h2 className="text-lg font-bold text-texto-principal mb-4 flex items-center gap-2"><Cloud size={20} className="text-principal"/> Uso de Recursos (%)</h2>
            <div className={`h-60 w-full overflow-hidden transition-opacity duration-500 ${isUpdating ? 'opacity-40' : 'opacity-100'}`}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="valor" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex flex-col h-[320px]">
            <h2 className="text-lg font-bold text-texto-principal mb-4 flex items-center gap-2"><Target size={20} className="text-principal"/> Proyectos Planificados</h2>
            <div className="overflow-auto flex-1">
              {(() => {
                const regionalProposals = proposals.filter(p => p.region?.includes(region.id));
                return regionalProposals.length > 0 ? (
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-texto-secundario uppercase bg-fondo border-y border-bordes sticky top-0">
                      <tr>
                        <th className="px-4 py-3 font-bold">Proyecto</th>
                        <th className="px-4 py-3 text-center font-bold">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {regionalProposals.slice(-4).reverse().map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 font-semibold text-texto-principal">{p.name}</td>
                          <td className="px-4 py-4 text-center">
                            <StatusBadge status={p.status || 'Saludable'} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full text-texto-secundario flex-col text-center border-2 border-dashed border-slate-200 rounded-xl m-2">
                    <p className="font-bold">No hay proyectos registrados en esta región.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: CENTRO DE ALERTAS (NUEVO DISEÑO) */}
      <section className="space-y-4 pb-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Seguridad */}
            <div className="bg-cards border border-bordes rounded-2xl shadow-sm hover:shadow-lg hover:shadow-red-100 hover:border-red-500 hover:-translate-y-1 transition-all duration-300 relative flex flex-col group cursor-default">
              <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-3 text-texto-principal">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg shadow-sm border border-red-100 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <ShieldAlert size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Seguridad
                </h3>
                {issuesCount > 0 && (
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200 shadow-sm">
                    {issuesCount}
                  </span>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                {issuesCount > 0 ? (
                  securityStatus.filter(s => s.status === 'Rojo' || s.status === 'Amarillo').map(alert => (
                    <div key={alert.id} className="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="mt-1.5">
                        <div className={`w-2 h-2 rounded-full ${alert.status === 'Rojo' ? 'bg-red-500' : 'bg-orange-500'} group-hover:scale-125 transition-transform shadow-sm`}></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-texto-principal group-hover:text-red-600 transition-colors">{alert.name}</h4>
                        <p className="text-xs text-texto-secundario mt-1 leading-relaxed">{alert.description}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-wider">Hace 2 horas</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl border border-green-100 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Sin vulnerabilidades
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Arquitectura */}
            <div className="bg-cards border border-bordes rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-100 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 relative flex flex-col group cursor-default">
              <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-3 text-texto-principal">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Activity size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Arquitectura
                </h3>
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                  1
                </span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                  <div className="mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shadow-sm"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-texto-principal group-hover:text-blue-600 transition-colors">Auto-Scaling en EC2</h4>
                    <p className="text-xs text-texto-secundario mt-1 leading-relaxed">3 nuevas instancias lanzadas por incremento de tráfico en la capa web.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-wider">Hace 15 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 3: Notificaciones */}
            <div className="bg-cards border border-bordes rounded-2xl shadow-sm hover:shadow-lg hover:shadow-orange-100 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 relative flex flex-col group cursor-default">
              <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-3 text-texto-principal">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shadow-sm border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Avisos de Cuenta
                </h3>
                <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200 shadow-sm">
                  1
                </span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                  <div className="mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform shadow-sm"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-texto-principal group-hover:text-orange-600 transition-colors">Alerta de Facturación</h4>
                    <p className="text-xs text-texto-secundario mt-1 leading-relaxed">El presupuesto mensual de $3000 ha superado el 85% de uso.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-wider">Hace 1 día</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
