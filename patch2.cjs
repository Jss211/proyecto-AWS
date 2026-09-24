const fs=require('fs');
let c=fs.readFileSync('src/pages/Services.tsx','utf8');

c=c.replace(
  "const [activeCategory, setActiveCategory] = useState('Todos');",
  "const [activeCategory, setActiveCategory] = useState('Todos');\n  const [selectedDetailService, setSelectedDetailService] = useState<AwsServiceInfo | null>(null);"
);

c=c.replace(
  /className="bg-cards border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"/g,
  "onClick={() => setSelectedDetailService(service)}\n              className=\"bg-cards border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-principal hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer\""
);

const modalCode = \
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
              <div className={\\\p-4 rounded-2xl \ \\\\}>
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
\;

c=c.replace("    </div>\n  );\n};\n", modalCode);

fs.writeFileSync('src/pages/Services.tsx', c, 'utf8');
