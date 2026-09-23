import React, { useState } from 'react';
import { Globe, Waypoints, Cloud, Server, Database, ArrowDown, Shield, Info, MousePointerClick } from 'lucide-react';

export const Network: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeInfo: Record<string, any> = {
    internet: { 
      title: 'Internet Global', 
      desc: 'Punto de origen del tráfico público intentando acceder a los recursos.',
      icon: Globe,
      color: 'text-slate-600',
      bg: 'bg-slate-100',
      stats: [
        { label: 'Origen', value: 'Tráfico Externo' },
        { label: 'Protocolos', value: 'HTTP / HTTPS' }
      ],
      tags: ['Red Pública', 'Usuarios']
    },
    route53: { 
      title: 'Amazon Route 53', 
      desc: 'Servicio de DNS altamente disponible que traduce dominios a IPs.',
      icon: Waypoints,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      stats: [
        { label: 'Función', value: 'DNS & Enrutamiento' },
        { label: 'Disponibilidad', value: 'SLA de 100%' }
      ],
      tags: ['Global', 'DNS', 'Alta Disponibilidad']
    },
    cloudfront: { 
      title: 'Amazon CloudFront', 
      desc: 'CDN que almacena contenido en ubicaciones de borde para reducir latencia.',
      icon: Cloud,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      stats: [
        { label: 'Capa', value: 'Caché (Edge)' },
        { label: 'Seguridad', value: 'Anti-DDoS' }
      ],
      tags: ['CDN', 'Velocidad', 'Estáticos']
    },
    vpc: { 
      title: 'Amazon VPC', 
      desc: 'Red privada virtual que aísla lógicamente tus recursos dentro de AWS.',
      icon: Shield,
      color: 'text-green-600',
      bg: 'bg-green-100',
      stats: [
        { label: 'Aislamiento', value: 'Subredes Privadas' },
        { label: 'Seguridad', value: 'Firewall interno' }
      ],
      tags: ['IaaS', 'Aislamiento', 'Topología']
    },
    ec2: { 
      title: 'Amazon EC2', 
      desc: 'Instancias de computación para procesar la lógica de negocio y backend.',
      icon: Server,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      stats: [
        { label: 'Rol', value: 'Servidor Web/App' },
        { label: 'Auto-Scaling', value: 'Configurado' }
      ],
      tags: ['Computación', 'Backend', 'Virtualización']
    },
    rds: { 
      title: 'Amazon RDS', 
      desc: 'Servicio de base de datos relacional administrada, escalable y segura.',
      icon: Database,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      stats: [
        { label: 'Motor', value: 'PostgreSQL / MySQL' },
        { label: 'Resiliencia', value: 'Multi-AZ' }
      ],
      tags: ['Almacenamiento', 'Relacional', 'PaaS']
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-texto-principal">Arquitectura de Red</h1>
          <p className="text-texto-secundario">Visualización interactiva del flujo de tráfico desde Internet hasta los recursos internos.</p>
        </div>
      </div>

      {/* DIAGRAMA INTERACTIVO */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden relative min-h-[600px]">
        {/* Patrón de fondo tipo "plano" */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        {/* PANEL DE INFORMACIÓN RICH */}
        <div className="lg:absolute lg:top-12 lg:right-12 z-20 bg-white border border-slate-200 rounded-2xl p-0 shadow-xl w-full lg:w-80 mt-8 lg:mt-0 mb-8 lg:mb-0 transition-all duration-300 overflow-hidden">
          {selectedNode ? (
            <div className="animate-fade-in flex flex-col h-full">
              {/* Header colored by service */}
              <div className={`${nodeInfo[selectedNode].bg} p-5 flex items-center gap-4 border-b border-slate-100`}>
                <div className={`p-3 bg-white rounded-xl shadow-sm ${nodeInfo[selectedNode].color}`}>
                  {React.createElement(nodeInfo[selectedNode].icon, { size: 28 })}
                </div>
                <div>
                  <h3 className={`text-lg font-black ${nodeInfo[selectedNode].color}`}>{nodeInfo[selectedNode].title}</h3>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-sm text-texto-secundario font-medium leading-relaxed">
                  {nodeInfo[selectedNode].desc}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {nodeInfo[selectedNode].stats.map((stat: any, i: number) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">{stat.label}</span>
                      <span className="block text-xs font-bold text-texto-principal">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {nodeInfo[selectedNode].tags.map((tag: string, i: number) => (
                    <span key={i} className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 h-64 p-6 bg-slate-50/50">
              <MousePointerClick size={48} className="mb-4 opacity-50 text-blue-300" />
              <p className="text-sm font-bold text-slate-500">Haz clic en un nodo de la arquitectura para inspeccionar sus características técnicas.</p>
            </div>
          )}
        </div>

        <div className="relative flex flex-col items-center justify-center z-10 max-w-4xl mx-auto">
          
          {/* 1. INTERNET */}
          <div 
            onClick={() => setSelectedNode('internet')}
            className={`group flex flex-col items-center cursor-pointer w-full max-w-[280px] transition-transform ${selectedNode === 'internet' ? 'scale-105' : ''}`}
          >
            <div className={`w-20 h-20 bg-slate-50 border-2 rounded-full flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-100 transition-all duration-300 z-10 relative ${selectedNode === 'internet' ? 'border-blue-500 shadow-blue-200 shadow-lg' : 'border-slate-300'}`}>
              <Globe size={36} className={`transition-all duration-300 ${selectedNode === 'internet' ? 'text-blue-500 scale-110' : 'text-slate-600 group-hover:text-blue-500 group-hover:scale-110'}`} />
            </div>
            <h3 className={`font-bold mt-3 transition-colors ${selectedNode === 'internet' ? 'text-blue-600' : 'text-texto-principal group-hover:text-blue-600'}`}>Internet</h3>
            <p className="text-xs text-texto-secundario text-center">Usuarios Globales</p>
          </div>

          {/* ARROW */}
          <div className="flex flex-col items-center justify-center h-16 pointer-events-none">
            <ArrowDown size={28} className="text-blue-400 animate-bounce" />
          </div>

          {/* 2. ROUTE 53 */}
          <div 
            onClick={() => setSelectedNode('route53')}
            className={`group flex flex-col items-center cursor-pointer w-full max-w-[280px] transition-transform ${selectedNode === 'route53' ? 'scale-105' : ''}`}
          >
            <div className={`w-full bg-white border-2 p-4 rounded-2xl flex items-center gap-4 group-hover:border-orange-500 group-hover:shadow-lg group-hover:shadow-orange-100 transition-all duration-300 z-10 ${selectedNode === 'route53' ? 'border-orange-500 shadow-lg shadow-orange-100' : 'border-orange-200'}`}>
              <div className={`p-3 rounded-xl transition-colors duration-300 ${selectedNode === 'route53' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'}`}>
                <Waypoints size={28} className={`transition-transform duration-300 ${selectedNode === 'route53' ? 'scale-110' : 'group-hover:scale-110'}`} />
              </div>
              <div className="text-left">
                <h3 className={`font-bold transition-colors ${selectedNode === 'route53' ? 'text-orange-600' : 'text-texto-principal group-hover:text-orange-600'}`}>Route 53</h3>
                <p className="text-xs text-texto-secundario">DNS y Enrutamiento</p>
              </div>
            </div>
          </div>

          {/* ARROW */}
          <div className="flex flex-col items-center justify-center h-16 pointer-events-none">
            <ArrowDown size={28} className="text-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          {/* 3. CLOUDFRONT */}
          <div 
            onClick={() => setSelectedNode('cloudfront')}
            className={`group flex flex-col items-center cursor-pointer w-full max-w-[280px] transition-transform ${selectedNode === 'cloudfront' ? 'scale-105' : ''}`}
          >
            <div className={`w-full bg-white border-2 p-4 rounded-2xl flex items-center gap-4 group-hover:border-purple-500 group-hover:shadow-lg group-hover:shadow-purple-100 transition-all duration-300 z-10 ${selectedNode === 'cloudfront' ? 'border-purple-500 shadow-lg shadow-purple-100' : 'border-purple-200'}`}>
              <div className={`p-3 rounded-xl transition-colors duration-300 ${selectedNode === 'cloudfront' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white'}`}>
                <Cloud size={28} className={`transition-transform duration-300 ${selectedNode === 'cloudfront' ? 'scale-110' : 'group-hover:scale-110'}`} />
              </div>
              <div className="text-left">
                <h3 className={`font-bold transition-colors ${selectedNode === 'cloudfront' ? 'text-purple-600' : 'text-texto-principal group-hover:text-purple-600'}`}>CloudFront</h3>
                <p className="text-xs text-texto-secundario">CDN Global / Caché</p>
              </div>
            </div>
          </div>

          {/* ARROW */}
          <div className="flex flex-col items-center justify-center h-16 pointer-events-none">
            <ArrowDown size={28} className="text-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* 4. VPC (Contenedor) */}
          <div 
            onClick={(e) => {
              // Prevenir que clics en los hijos también activen el VPC si no queremos, 
              // pero como los hijos tienen e.stopPropagation() lo manejaremos.
              setSelectedNode('vpc');
            }}
            className={`w-full max-w-2xl bg-slate-50 border-2 border-dashed rounded-3xl p-6 md:p-10 relative mt-2 group hover:border-green-500 transition-all duration-500 cursor-pointer ${selectedNode === 'vpc' ? 'border-green-500 bg-green-50/50' : 'border-green-300'}`}
          >
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-white border-2 px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 group-hover:border-green-500 group-hover:bg-green-50 transition-colors shadow-sm ${selectedNode === 'vpc' ? 'border-green-500 bg-green-50 text-green-800' : 'border-green-300 text-green-700'}`}>
              <Shield size={18} />
              Amazon VPC (Red Interna)
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 relative">
              
              {/* Conector invisible para desktop */}
              <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-8 border-t-2 border-l-2 border-r-2 border-blue-200 rounded-t-xl z-0 pointer-events-none"></div>

              {/* EC2 */}
              <div 
                onClick={(e) => { e.stopPropagation(); setSelectedNode('ec2'); }}
                className={`flex flex-col items-center relative z-10 cursor-pointer transition-transform ${selectedNode === 'ec2' ? 'scale-105' : ''}`}
              >
                <div className="flex flex-col items-center justify-center h-12 pointer-events-none">
                  <ArrowDown size={24} className="text-blue-400 animate-bounce" style={{ animationDelay: '0.6s' }} />
                </div>
                
                <div className={`w-full bg-white border-2 p-6 rounded-2xl flex flex-col items-center gap-3 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 group/ec2 ${selectedNode === 'ec2' ? 'border-orange-500 shadow-lg shadow-orange-100' : 'border-orange-200'}`}>
                  <div className={`p-4 rounded-full transition-colors duration-300 ${selectedNode === 'ec2' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600 group-hover/ec2:bg-orange-500 group-hover/ec2:text-white'}`}>
                    <Server size={36} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-texto-principal text-lg">Amazon EC2</h3>
                    <p className="text-xs text-texto-secundario mt-1">Computación / Web</p>
                  </div>
                </div>
              </div>

              {/* RDS */}
              <div 
                onClick={(e) => { e.stopPropagation(); setSelectedNode('rds'); }}
                className={`flex flex-col items-center relative z-10 cursor-pointer transition-transform ${selectedNode === 'rds' ? 'scale-105' : ''}`}
              >
                <div className="flex flex-col items-center justify-center h-12 pointer-events-none">
                  <ArrowDown size={24} className="text-blue-400 animate-bounce" style={{ animationDelay: '0.8s' }} />
                </div>
                
                <div className={`w-full bg-white border-2 p-6 rounded-2xl flex flex-col items-center gap-3 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group/rds ${selectedNode === 'rds' ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-blue-200'}`}>
                  <div className={`p-4 rounded-full transition-colors duration-300 ${selectedNode === 'rds' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600 group-hover/rds:bg-blue-500 group-hover/rds:text-white'}`}>
                    <Database size={36} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-texto-principal text-lg">Amazon RDS</h3>
                    <p className="text-xs text-texto-secundario mt-1">Base de Datos</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
