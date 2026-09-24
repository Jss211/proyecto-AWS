import React, { useState } from 'react';
import { Server, Database, Users, Shield, Waypoints, Cloud, HardDrive, Search, Filter, X, ExternalLink, CheckCircle, Clock } from 'lucide-react';

interface AwsServiceInfo {
  id: string;
  name: string;
  category: string;
  desc: string;
  func: string;
  status: 'Activo' | 'En Mantenimiento' | 'Optimizado';
  icon: React.ElementType;
  color: string;
  bg: string;
  details?: { region: string; tier: string; uptime: string; lastUpdated: string; };
}

const servicesData: AwsServiceInfo[] = [
  { id: 'ec2', name: 'Amazon EC2', category: 'Computación', desc: 'Capacidad de cómputo segura y redimensionable en la nube. Permite lanzar servidores virtuales bajo demanda.', func: 'Servidores Virtuales', status: 'Activo', icon: Server, color: 'text-orange-600', bg: 'bg-orange-100', details: { region: 'us-east-1', tier: 'T3.Micro (Auto-Scaling)', uptime: '99.99%', lastUpdated: 'Hoy, 08:30 AM' } },
  { id: 's3', name: 'Amazon S3', category: 'Almacenamiento', desc: 'Almacenamiento de objetos construido para almacenar y recuperar cualquier cantidad de datos desde cualquier lugar.', func: 'Almacenamiento de Archivos', status: 'Activo', icon: HardDrive, color: 'text-green-600', bg: 'bg-green-100', details: { region: 'Global', tier: 'S3 Standard', uptime: '99.9999%', lastUpdated: 'Hace 2 dias' } },
  { id: 'rds', name: 'Amazon RDS', category: 'Base de Datos', desc: 'Servicio de base de datos relacional administrado. Facilita la configuración y escalabilidad de bases de datos.', func: 'Base de Datos Relacional', status: 'En Mantenimiento', icon: Database, color: 'text-blue-600', bg: 'bg-blue-100', details: { region: 'us-east-1', tier: 'db.t3.small', uptime: '98.50%', lastUpdated: 'Hace 1 hora' } },
  { id: 'iam', name: 'AWS IAM', category: 'Seguridad', desc: 'Administre el acceso a los servicios y recursos de AWS de manera segura mediante políticas granulares.', func: 'Gestión de Accesos', status: 'Activo', icon: Users, color: 'text-red-600', bg: 'bg-red-100', details: { region: 'Global', tier: 'Gratuito', uptime: '100%', lastUpdated: 'Hace 1 semana' } },
  { id: 'vpc', name: 'Amazon VPC', category: 'Redes', desc: 'Aísle lógicamente sus recursos en una red virtual definida y controle todo el tráfico de red.', func: 'Red Privada Virtual', status: 'Activo', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-100', details: { region: 'us-east-1', tier: 'VPC con NAT Gateway', uptime: '100%', lastUpdated: 'Ayer' } },
  { id: 'route53', name: 'Amazon Route 53', category: 'Redes', desc: 'Servicio web de DNS en la nube, altamente disponible y escalable para enrutar el tráfico de usuarios.', func: 'Resolución DNS', status: 'Activo', icon: Waypoints, color: 'text-orange-500', bg: 'bg-orange-50', details: { region: 'Global', tier: 'Zonas Alojadas Publicas', uptime: '100%', lastUpdated: 'Hace 1 mes' } },
  { id: 'cloudfront', name: 'Amazon CloudFront', category: 'Redes', desc: 'Red de entrega de contenido (CDN) rápida, altamente segura y programable para datos estáticos y dinámicos.', func: 'CDN Global', status: 'Optimizado', icon: Cloud, color: 'text-purple-600', bg: 'bg-purple-100', details: { region: 'Global', tier: 'Optimizacion de Cache', uptime: '99.99%', lastUpdated: 'Hoy, 10:15 AM' } },
];

const categories = ['Todos', ...Array.from(new Set(servicesData.map(s => s.category)))];

export const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedDetailService, setSelectedDetailService] = useState<AwsServiceInfo | null>(null);

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-50 text-green-700 border-green-200';
      case 'En Mantenimiento': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Optimizado': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-500';
      case 'En Mantenimiento': return 'bg-yellow-500';
      case 'Optimizado': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-2xl font-bold text-texto-principal">Catálogo de Servicios AWS</h1>
          <p className="text-texto-secundario mt-1">Explora, filtra y consulta los servicios utilizados en la infraestructura.</p>
        </div>
        
        {/* BUSCADOR */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FILTROS DE CATEGORÍA */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter size={18} className="text-slate-400 mr-2 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-principal text-white shadow-md shadow-blue-500/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID DE SERVICIOS */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setSelectedDetailService(service)}
              className="bg-cards border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-principal hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(service.icon, { size: 28 })}
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200">
                  {service.category}
                </span>
              </div>
              
              {/* Card Body */}
              <h3 className="text-xl font-bold text-texto-principal mb-2 group-hover:text-principal transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-texto-secundario leading-relaxed flex-1 mb-6">
                {service.desc}
              </p>

              {/* Card Footer (Función y Estado) */}
              <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-500">Función:</span>
                  <span className="font-bold text-texto-principal text-right">{service.func}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-500">Estado:</span>
                  <div className={`px-3 py-1 rounded-full border flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${getStatusStyle(service.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(service.status)} ${service.status === 'Activo' || service.status === 'Optimizado' ? 'animate-pulse' : ''}`}></div>
                    {service.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl border-dashed">
          <Search size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No se encontraron servicios</h3>
          <p className="text-slate-500">Intenta con otros términos de búsqueda o cambia la categoría.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }}
            className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* MODAL DE VISTA DETALLADA */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedDetailService(null)}>
          <div className="bg-cards border border-bordes rounded-3xl p-8 shadow-2xl max-w-lg w-full relative transform scale-100 transition-transform" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedDetailService(null)} 
              className="absolute top-5 right-5 text-texto-secundario hover:text-texto-principal bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
               <X size={20} />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${selectedDetailService.bg} ${selectedDetailService.color}`}>
                {React.createElement(selectedDetailService.icon, { size: 36 })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-texto-principal">{selectedDetailService.name}</h2>
                <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider">{selectedDetailService.category}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-texto-secundario mb-2">Descripción del Servicio</h4>
                <p className="text-texto-principal leading-relaxed">{selectedDetailService.desc}</p>
              </div>

              {selectedDetailService.details && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div>
                    <span className="block text-xs font-semibold text-texto-secundario uppercase mb-1">Región</span>
                    <span className="font-bold text-texto-principal flex items-center gap-1"><Waypoints size={14} className="text-principal" /> {selectedDetailService.details.region}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-texto-secundario uppercase mb-1">Capa/Tier</span>
                    <span className="font-bold text-texto-principal flex items-center gap-1"><Server size={14} className="text-principal" /> {selectedDetailService.details.tier}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-texto-secundario uppercase mb-1">Uptime (SLA)</span>
                    <span className="font-bold text-green-600 flex items-center gap-1"><CheckCircle size={14} /> {selectedDetailService.details.uptime}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-texto-secundario uppercase mb-1">Última Actividad</span>
                    <span className="font-bold text-texto-principal flex items-center gap-1"><Clock size={14} className="text-slate-400" /> {selectedDetailService.details.lastUpdated}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button onClick={() => setSelectedDetailService(null)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Cerrar
                </button>
                <button className="px-5 py-2.5 bg-principal hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all">
                  <ExternalLink size={18} /> Ver Documentación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
