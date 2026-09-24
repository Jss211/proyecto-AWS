import React, { useState, useEffect } from 'react';
import { TrendingDown, Plus, Trash2, Clock, Hash, RotateCcw, Download, Info, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BillingItem {
  id: string;
  serviceName: string;
  category: string;
  quantity: number;
  hours: number;
  monthlyCost: number;
  annualCost: number;
}

const initialBillingData: BillingItem[] = [
  { id: '1', serviceName: 'Amazon EC2 (t3.medium)', category: 'Computación', quantity: 4, hours: 730, monthlyCost: 121.47, annualCost: 1457.64 },
  { id: '2', serviceName: 'Amazon RDS (db.t3.medium)', category: 'Base de Datos', quantity: 2, hours: 730, monthlyCost: 99.28, annualCost: 1191.36 },
  { id: '3', serviceName: 'Amazon S3 (Standard)', category: 'Almacenamiento', quantity: 500, hours: 730, monthlyCost: 11.50, annualCost: 138.00 },
];

const serviceRates: Record<string, { rate: number, category: string }> = {
  'Amazon EC2 (t3.medium)': { rate: 0.0416, category: 'Computación' },
  'Amazon RDS (db.t3.medium)': { rate: 0.0680, category: 'Base de Datos' },
  'Amazon S3 (Standard)': { rate: 0.000023, category: 'Almacenamiento' },
  'AWS Lambda': { rate: 0.0000166, category: 'Computación' },
  'Amazon CloudFront': { rate: 0.0850, category: 'Redes y CDN' }
};

export const Costs: React.FC = () => {
  const [billingData, setBillingData] = useState<BillingItem[]>(() => {
    const saved = localStorage.getItem('cloudCosts');
    return saved ? JSON.parse(saved) : initialBillingData;
  });
  
  const [selectedService, setSelectedService] = useState('Amazon EC2 (t3.medium)');
  const [qty, setQty] = useState<number>(1);
  const [hrs, setHrs] = useState<number>(730);

  useEffect(() => {
    localStorage.setItem('cloudCosts', JSON.stringify(billingData));
  }, [billingData]);

  const handleAddService = () => {
    const rate = serviceRates[selectedService].rate;
    const monthlyCost = parseFloat((qty * hrs * rate).toFixed(2));
    
    const newService: BillingItem = {
      id: Date.now().toString(),
      serviceName: selectedService,
      category: serviceRates[selectedService].category,
      quantity: qty,
      hours: hrs,
      monthlyCost: monthlyCost,
      annualCost: parseFloat((monthlyCost * 12).toFixed(2))
    };
    setBillingData([...billingData, newService]);
  };

  const handleRemoveService = (id: string) => {
    setBillingData(billingData.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setBillingData(initialBillingData);
  };

  const exportToCSV = () => {
    const headers = ['Servicio AWS', 'Categoria', 'Cantidad', 'Horas Estimadas', 'Costo Mensual ($)', 'Costo Anual ($)'];
    const rows = billingData.map(item => [
      item.serviceName,
      item.category,
      item.quantity,
      item.hours,
      item.monthlyCost,
      item.annualCost
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_costos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalMensual = billingData.reduce((acc, item) => acc + item.monthlyCost, 0);
  const totalAnual = billingData.reduce((acc, item) => acc + item.annualCost, 0);

  const currentRate = serviceRates[selectedService].rate;
  const previewMonthly = parseFloat((qty * hrs * currentRate).toFixed(2));
  const previewAnnual = parseFloat((previewMonthly * 12).toFixed(2));

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316'];

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold text-texto-principal">Costos y Economía Cloud</h1>
          <p className="text-texto-secundario">Estimación y desglose presupuestario de recursos en AWS.</p>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 shrink-0">
          <button onClick={handleReset} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors shadow-sm h-[36px]" title="Restaurar simulación">
            <RotateCcw size={16} /> Restablecer
          </button>
          <button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors shadow-sm h-[36px]" title="Exportar reporte">
            <Download size={16} /> Exportar CSV
          </button>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all cursor-default">
          <p className="text-xs font-bold text-texto-secundario uppercase tracking-wider mb-2">Presupuesto Mensual Estimado</p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-orange-500">$</span>
            <p className="text-3xl font-bold text-texto-principal">{totalMensual.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
            <span className="text-sm font-semibold text-texto-secundario self-end mb-1">USD/mes</span>
          </div>
          <p className="text-sm text-texto-secundario mt-2">Basado en {billingData.length} componentes dimensionados</p>
        </div>

        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-green-500 transition-all cursor-default">
          <p className="text-xs font-bold text-texto-secundario uppercase tracking-wider mb-2">Proyección Anual (TCO)</p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-seguridad">$</span>
            <p className="text-3xl font-bold text-texto-principal">{totalAnual.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
            <span className="text-sm font-semibold text-texto-secundario self-end mb-1">USD/año</span>
          </div>
          <p className="text-sm text-texto-secundario mt-2">12 meses de operación continua</p>
        </div>

        <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500 transition-all cursor-default">
          <p className="text-xs font-bold text-texto-secundario uppercase tracking-wider mb-2">Modelo de Facturación AWS</p>
          <div className="flex items-center gap-2">
            <TrendingDown size={28} className="text-principal" />
            <p className="text-xl font-bold text-texto-principal">Pay-as-you-go</p>
          </div>
          <p className="text-sm text-texto-secundario mt-3">Pago por uso sin inversión inicial fija</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* CALCULADORA FORM (Columna Izquierda) */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-texto-principal flex items-center gap-2 mb-6">
              <Zap className="text-orange-500" size={20}/> Calculadora de Costos
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-texto-principal mb-2">1. Selección del Servicio AWS *</label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-fondo border border-bordes text-texto-principal rounded-xl px-4 py-2.5 outline-none focus:border-principal transition-colors font-medium shadow-sm"
                >
                  {Object.keys(serviceRates).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <p className="text-xs text-texto-secundario mt-2">Tarifa base aproximada: ${currentRate}/h</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-texto-principal mb-2">2. Unidades</label>
                  <input 
                    type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full bg-fondo border border-bordes text-texto-principal rounded-xl px-4 py-2.5 outline-none focus:border-principal transition-colors font-bold shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-texto-principal mb-2">3. Horas/mes</label>
                  <input 
                    type="number" min="1" max="730" value={hrs} onChange={(e) => setHrs(Number(e.target.value))}
                    className="w-full bg-fondo border border-bordes text-texto-principal rounded-xl px-4 py-2.5 outline-none focus:border-principal transition-colors font-bold shadow-sm"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-semibold">Costo Mensual Calculado:</span>
                  <span className="font-bold text-texto-principal">${previewMonthly.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-semibold">Costo Anual Proyectado:</span>
                  <span className="font-bold text-seguridad">${previewAnnual.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                </div>
              </div>

              <button 
                onClick={handleAddService} 
                className="w-full bg-principal hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all mt-4"
              >
                <Plus size={18} /> Agregar a la Estimación
              </button>
            </div>
          </div>
          
          {/* PIE CHART */}
          <div className="bg-cards border border-bordes p-6 rounded-2xl shadow-sm flex flex-col h-[300px]">
            <h2 className="text-lg font-bold text-texto-principal mb-2">Distribución de Costos</h2>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={billingData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="monthlyCost" nameKey="serviceName">
                    {billingData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`$${value}`, 'Mensual']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: 'bold' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CARDS GRID (Columna Derecha) */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-texto-principal">Servicios en la Estimación ({billingData.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {billingData.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center bg-cards border border-dashed border-bordes rounded-2xl text-texto-secundario">
                <Info size={32} className="mb-2 opacity-50" />
                <p className="font-semibold">Presupuesto vacío.</p>
                <p className="text-sm">Agrega servicios usando la calculadora.</p>
              </div>
            )}
            {billingData.map((item) => (
              <div key={item.id} className="bg-cards border border-bordes rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-principal transition-all relative group">
                <button 
                  onClick={() => handleRemoveService(item.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
                
                <h3 className="font-bold text-texto-principal text-base pr-8 mb-2 truncate" title={item.serviceName}>{item.serviceName}</h3>
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-principal border border-blue-100 mb-4">
                  {item.category}
                </span>

                <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase flex items-center gap-1"><Hash size={12}/> Cantidad</span>
                    <span className="font-bold text-texto-principal text-sm">{item.quantity}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-slate-200">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> Horas/mes</span>
                    <span className="font-bold text-texto-principal text-sm">{item.hours}h</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-slate-100">
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-500 mb-1">Costo Mensual</span>
                    <p className="text-lg font-bold text-orange-500 leading-none">
                      ${item.monthlyCost.toLocaleString('en-US', {minimumFractionDigits: 2})} <span className="text-xs font-semibold text-slate-400">/mes</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-semibold text-slate-500 mb-1">Costo Anual</span>
                    <p className="text-base font-bold text-seguridad leading-none">
                      ${item.annualCost.toLocaleString('en-US', {minimumFractionDigits: 2})} <span className="text-[10px] font-semibold text-slate-400">/año</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
