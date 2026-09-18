import React, { useEffect, useState } from 'react';
import { Server, DollarSign, ShieldAlert, Activity, MapPin, Database, Target, Cloud, AlertCircle, Bell } from 'lucide-react';
import { securityStatus } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { CloudProposal } from '../types/cloud';
import { StatusBadge } from '../components/StatusBadge';

export const Dashboard: React.FC = () => {
  const [proposals, setProposals] = useState<CloudProposal[]>([]);
  const [costs, setCosts] = useState({ monthly: 2850, annual: 34200 });
  const [serviceCount, setServiceCount] = useState(6);

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
      setCosts({ monthly: totalMensual, annual: totalAnual });
      setServiceCount(parsedCosts.length);
    }
  }, []);

  const issuesCount = securityStatus.filter(s => s.status === 'Rojo' || s.status === 'Amarillo').length;
  
  const chartData = [
    { name: 'Cómputo', valor: 45 },
    { name: 'BD', valor: 25 },
    { name: 'Red', valor: 20 },
    { name: 'Seguridad', valor: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* CABECERA PRINCIPAL */}
      <div>
        <h1 className="text-2xl font-bold text-texto-principal">Centro de Mando Cloud</h1>
      </div>

      {/* SECCIÓN 1: INDICADORES GLOBALES */}
      <section className="space-y-4">
        {/* Fila 1: 4 Cuadros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <Server size={18} className="text-principal" /> <span className="text-xs font-bold uppercase tracking-wider">Servicios Utilizados</span>
            </div>
            <p className="text-2xl font-bold text-texto-principal">{serviceCount} <span className="text-sm text-texto-secundario font-medium">Servicios</span></p>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <MapPin size={18} className="text-purple-600" /> <span className="text-xs font-bold uppercase tracking-wider">Región Seleccionada</span>
            </div>
            <p className="text-2xl font-bold text-texto-principal">us-east-1</p>
            <p className="text-xs font-semibold text-texto-secundario mt-1">N. Virginia</p>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <DollarSign size={18} className="text-seguridad" /> <span className="text-xs font-bold uppercase tracking-wider">Mensual Estimado</span>
            </div>
            <p className="text-2xl font-bold text-texto-principal">${costs.monthly.toLocaleString()}</p>
          </div>

          <div className="bg-cards border border-bordes p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-texto-secundario">
              <DollarSign size={18} className="text-green-700" /> <span className="text-xs font-bold uppercase tracking-wider">Anual Estimado</span>
            </div>
            <p className="text-2xl font-bold text-texto-principal">${costs.annual.toLocaleString()}</p>
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
          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-texto-principal mb-4 flex items-center gap-2"><Cloud size={20} className="text-principal"/> Uso de Recursos (%)</h2>
            <div className="h-60 w-full overflow-hidden">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                  <Bar dataKey="valor" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex flex-col h-[320px]">
            <h2 className="text-lg font-bold text-texto-principal mb-4 flex items-center gap-2"><Target size={20} className="text-principal"/> Proyectos Planificados</h2>
            <div className="overflow-auto flex-1">
              {proposals.length > 0 ? (
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-xs text-texto-secundario uppercase bg-fondo border-y border-bordes">
                    <tr>
                      <th className="px-4 py-3 font-bold">Proyecto</th>
                      <th className="px-4 py-3 text-center font-bold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {proposals.slice(-4).reverse().map((p, i) => (
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
                <div className="flex items-center justify-center h-full text-texto-secundario flex-col text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="font-bold">No hay proyectos registrados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: CENTRO DE ALERTAS */}
      <section className="space-y-4 pb-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`p-6 rounded-2xl shadow-sm border ${issuesCount > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <h3 className={`font-bold flex items-center gap-2 mb-4 ${issuesCount > 0 ? 'text-alertas' : 'text-seguridad'}`}>
              <AlertCircle size={20} /> Alertas de Seguridad
            </h3>
            {issuesCount > 0 ? (
              <ul className="space-y-3">
                {securityStatus.filter(s => s.status === 'Rojo' || s.status === 'Amarillo').map(alert => (
                  <li key={alert.id} className="text-sm flex flex-col gap-1 text-red-900 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                    <strong className="font-bold flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${alert.status === 'Rojo' ? 'bg-alertas' : 'bg-orange-500'}`}></div> {alert.name}</strong>
                    <span className="text-xs text-red-700 pl-4">{alert.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
               <p className="text-sm font-semibold text-green-700 bg-white p-3 rounded-lg border border-green-100">Sin vulnerabilidades.</p>
            )}
          </div>

          <div className="p-6 rounded-2xl shadow-sm border bg-blue-50 border-blue-200">
            <h3 className="font-bold text-principal flex items-center gap-2 mb-4">
              <Activity size={20} /> Alertas de Arquitectura
            </h3>
            <ul className="space-y-3">
               <li className="text-sm flex flex-col gap-1 text-blue-900 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                 <strong className="font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-principal"></div> Auto-Scaling en EC2</strong>
                 <span className="text-xs text-blue-700 pl-4">3 nuevas instancias lanzadas por tráfico.</span>
               </li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl shadow-sm border bg-orange-50 border-orange-200">
            <h3 className="font-bold text-orange-700 flex items-center gap-2 mb-4">
              <Bell size={20} /> Notificaciones de Cuenta
            </h3>
            <ul className="space-y-3">
               <li className="text-sm flex flex-col gap-1 text-orange-900 bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                 <strong className="font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-costos"></div> Alerta de Facturación</strong>
                 <span className="text-xs text-orange-700 pl-4">El presupuesto superó el 85%.</span>
               </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};
