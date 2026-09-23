import React from 'react';
import { ShieldCheck, Server, Users, Lock, Key, FileText, Database, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { securityStatus } from '../data/mockData';

export const Security: React.FC = () => {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verde': return <CheckCircle className="text-green-600" size={24} />;
      case 'Amarillo': return <AlertTriangle className="text-yellow-600" size={24} />;
      case 'Rojo': return <AlertTriangle className="text-red-600" size={24} />;
      default: return <Info className="text-blue-600" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verde': return 'bg-green-50 border-green-200 text-green-800 hover:border-green-400 hover:shadow-green-100';
      case 'Amarillo': return 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:border-yellow-400 hover:shadow-yellow-100';
      case 'Rojo': return 'bg-red-50 border-red-200 text-red-800 hover:border-red-400 hover:shadow-red-100';
      default: return 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-400';
    }
  };

  const getIconForCategory = (id: string) => {
    switch (id) {
      case 'iam-policies': return <Users size={20} />;
      case 'data-protection': return <Database size={20} />;
      case 'compliance': return <FileText size={20} />;
      case 'account-protection': return <Key size={20} />;
      default: return <ShieldCheck size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-texto-principal">Seguridad y Cumplimiento</h1>
          <p className="text-texto-secundario">Gestión de identidad, protección de datos y modelo de responsabilidad compartida.</p>
        </div>
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 flex items-center gap-2 shadow-sm font-semibold text-sm">
          <CheckCircle size={16} className="text-green-600" />
          <span>Evaluación del sistema: Saludable</span>
        </div>
      </div>

      {/* MODELO DE RESPONSABILIDAD COMPARTIDA */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-texto-principal flex items-center gap-2">
          <ShieldCheck className="text-principal" /> Modelo de Responsabilidad Compartida
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cliente */}
          <div className="bg-cards border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <Users size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-bold text-texto-principal text-lg group-hover:text-blue-600 transition-colors">Responsabilidad del Cliente</h3>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Seguridad EN la nube</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-texto-secundario">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div> Datos del cliente (Cifrado e integridad)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div> Gestión de Identidad y Accesos (IAM)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div> Configuración de Firewall y Red (Security Groups, VPC)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div> Sistema Operativo y protección de cuentas</li>
            </ul>
          </div>

          {/* AWS */}
          <div className="bg-cards border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Server size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-bold text-texto-principal text-lg group-hover:text-orange-600 transition-colors">Responsabilidad de AWS</h3>
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Seguridad DE la nube</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-texto-secundario">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div> Hardware e Infraestructura Global</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div> Computación, Almacenamiento, Bases de Datos, Red</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div> Seguridad física de los centros de datos</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div> Cumplimiento y certificaciones globales</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ESTADO DE SEGURIDAD (IAM, Datos, Cuentas, Cumplimiento) */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-texto-principal flex items-center gap-2">
            <Lock className="text-principal" /> Estado de la Postura de Seguridad
          </h2>
          <span className="text-xs font-semibold text-texto-secundario bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Última evaluación: Hace 2 min</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityStatus.map((item) => (
            <div key={item.id} className={`p-6 rounded-2xl border flex flex-col hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-sm hover:shadow-lg ${getStatusColor(item.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/40 text-current group-hover:scale-110 transition-transform duration-300">
                  {getIconForCategory(item.id)}
                </div>
                <div className="group-hover:rotate-12 transition-transform duration-300">
                  {getStatusIcon(item.status)}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-sm opacity-90 leading-relaxed flex-1">{item.description}</p>
              <div className="mt-5 pt-4 border-t border-current/10">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'Verde' ? 'bg-green-500' : item.status === 'Amarillo' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  Estado: {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
