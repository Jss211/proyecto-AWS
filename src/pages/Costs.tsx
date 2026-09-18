import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, Calendar, Plus, Trash2, Clock, Hash, Activity, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Estructura de datos avanzada con los requisitos exactos
interface BillingItem {
  id: string;
  serviceName: string;
  quantity: number;
  hours: number;
  monthlyCost: number;
  annualCost: number;
}

const initialBillingData: BillingItem[] = [
  { id: '1', serviceName: 'Amazon EC2', quantity: 4, hours: 730, monthlyCost: 1450, annualCost: 17400 },
  { id: '2', serviceName: 'Amazon RDS', quantity: 2, hours: 730, monthlyCost: 850, annualCost: 10200 },
  { id: '3', serviceName: 'Amazon S3', quantity: 1, hours: 730, monthlyCost: 350, annualCost: 4200 },
  { id: '4', serviceName: 'CloudFront', quantity: 1, hours: 730, monthlyCost: 200, annualCost: 2400 },
];

export const Costs: React.FC = () => {
  const [billingData, setBillingData] = useState<BillingItem[]>(() => {
    const saved = localStorage.getItem('cloudCosts');
    return saved ? JSON.parse(saved) : initialBillingData;
  });
  const [month, setMonth] = useState('2026-09');
  const [selectedService, setSelectedService] = useState('AWS Lambda');

  useEffect(() => {
    localStorage.setItem('cloudCosts', JSON.stringify(billingData));
  }, [billingData]);

  // Cálculo de totales
  const totalMensual = billingData.reduce((acc: number, item: BillingItem) => acc + item.monthlyCost, 0);
  const totalAnual = billingData.reduce((acc: number, item: BillingItem) => acc + item.annualCost, 0);

  // Añadir servicio específico con todas las métricas requeridas
  const handleAddService = () => {
    const qty = Math.floor(Math.random() * 3) + 1;
    const hrs = 730; // Promedio horas al mes
    const monthly = Math.floor(Math.random() * 300) + 50;
    
    const newService = {
      id: `srv-${Date.now()}`,
      serviceName: selectedService,
      quantity: qty,
      hours: hrs,
      monthlyCost: monthly,
      annualCost: monthly * 12
    };
    setBillingData([...billingData, newService]);
  };

  const handleDeleteService = (id: string) => {
    setBillingData(billingData.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setBillingData(initialBillingData);
  };

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-texto-principal">Análisis de Costos</h1>
          <p className="text-texto-secundario">Presupuesto detallado por cantidad, horas y estimaciones mensuales/anuales.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-white border border-bordes rounded-lg p-2 flex items-center gap-2 shadow-sm">
            <Calendar size={18} className="text-texto-secundario" />
            <input 
              type="month" value={month} onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent text-sm font-semibold text-texto-principal outline-none cursor-pointer"
            />
          </div>
          
          {/* NUEVO: Selector de Servicio */}
          <div className="flex bg-fondo p-1.5 rounded-lg border border-bordes shadow-sm">
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="bg-white px-3 py-1.5 rounded-md text-sm outline-none border border-slate-200 font-semibold text-texto-principal"
            >
              <option value="AWS Lambda">AWS Lambda</option>
              <option value="Amazon S3">Amazon S3</option>
              <option value="Amazon RDS">Amazon RDS</option>
              <option value="Amazon CloudFront">Amazon CloudFront</option>
              <option value="Amazon VPC (NAT)">Amazon VPC (NAT)</option>
            </select>
            <button onClick={handleAddService} className="bg-principal hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 ml-2 transition-colors">
              <Plus size={16} /> Añadir
            </button>
            <button onClick={handleReset} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 ml-2 transition-colors" title="Restaurar servicios originales">
              <RotateCcw size={16} /> Restablecer
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de Resumen Global */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-texto-secundario mb-1">
              <DollarSign size={18} /> <h3 className="font-semibold">Costo Total Mensual Estimado</h3>
            </div>
            <p className="text-3xl font-bold text-texto-principal">${totalMensual.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 text-seguridad p-3 rounded-xl border border-green-200">
            <TrendingDown size={24} />
          </div>
        </div>

        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-texto-secundario mb-1">
              <Activity size={18} /> <h3 className="font-semibold">Costo Total Anual Estimado</h3>
            </div>
            <p className="text-3xl font-bold text-texto-principal">${totalAnual.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 text-principal p-3 rounded-xl border border-blue-200">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla de Facturación Detallada (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-cards border border-bordes p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold text-texto-principal mb-4">Desglose Técnico de Facturación</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs text-texto-secundario uppercase bg-fondo border-b border-bordes">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Servicio AWS</th>
                  <th className="px-4 py-3 text-center">Cantidad</th>
                  <th className="px-4 py-3 text-center">Horas Estimadas</th>
                  <th className="px-4 py-3 text-right">Costo Mensual</th>
                  <th className="px-4 py-3 text-right">Costo Anual</th>
                  <th className="px-4 py-3 text-center rounded-tr-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {billingData.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-texto-secundario">Presupuesto vacío. Añade un servicio.</td></tr>
                )}
                {billingData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-principal">{item.serviceName}</td>
                    <td className="px-4 py-3 text-center font-medium">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded flex items-center justify-center w-fit mx-auto gap-1">
                        <Hash size={12}/> {item.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-texto-secundario">
                      <span className="flex items-center justify-center gap-1"><Clock size={14}/> {item.hours}h</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-texto-principal">${item.monthlyCost.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-bold text-texto-secundario">${item.annualCost.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleDeleteService(item.id)}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors inline-block"
                        title="Eliminar servicio"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico Recharts Interactivo (Ocupa 1 columna) */}
        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex flex-col h-[450px]">
          <h2 className="text-lg font-bold text-texto-principal mb-2">Distribución Mensual</h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={billingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="monthlyCost"
                  nameKey="serviceName"
                >
                  {billingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`$${value}`, 'Mensual']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
