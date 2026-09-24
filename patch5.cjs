const fs=require('fs');
let c=fs.readFileSync('src/pages/Services.tsx','utf8');

c = c.replace('bg: string;', 'bg: string;\n  hoverBorder: string;\n  hoverIconBg: string;\n  hoverText: string;');

c = c.replace(/bg: 'bg-orange-100', details:/g, "bg: 'bg-orange-100', hoverBorder: 'hover:border-orange-500', hoverIconBg: 'group-hover:bg-orange-500', hoverText: 'group-hover:text-orange-600', details:");
c = c.replace(/bg: 'bg-green-100', details:/g, "bg: 'bg-green-100', hoverBorder: 'hover:border-green-500', hoverIconBg: 'group-hover:bg-green-500', hoverText: 'group-hover:text-green-600', details:");
c = c.replace(/bg: 'bg-blue-100', details:/g, "bg: 'bg-blue-100', hoverBorder: 'hover:border-blue-500', hoverIconBg: 'group-hover:bg-blue-500', hoverText: 'group-hover:text-blue-600', details:");
c = c.replace(/bg: 'bg-red-100', details:/g, "bg: 'bg-red-100', hoverBorder: 'hover:border-red-500', hoverIconBg: 'group-hover:bg-red-500', hoverText: 'group-hover:text-red-600', details:");
c = c.replace(/bg: 'bg-emerald-100', details:/g, "bg: 'bg-emerald-100', hoverBorder: 'hover:border-emerald-500', hoverIconBg: 'group-hover:bg-emerald-500', hoverText: 'group-hover:text-emerald-600', details:");
c = c.replace(/bg: 'bg-orange-50', details:/g, "bg: 'bg-orange-50', hoverBorder: 'hover:border-orange-500', hoverIconBg: 'group-hover:bg-orange-500', hoverText: 'group-hover:text-orange-500', details:");
c = c.replace(/bg: 'bg-purple-100', details:/g, "bg: 'bg-purple-100', hoverBorder: 'hover:border-purple-500', hoverIconBg: 'group-hover:bg-purple-500', hoverText: 'group-hover:text-purple-600', details:");

c = c.replace(
  'className="bg-cards border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-principal hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative"',
  'className={g-cards border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl  hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative}'
);

c = c.replace(
  /className=\{p-3 rounded-xl \ \ group-hover:scale-110 group-hover:bg-principal group-hover:text-white transition-all duration-300\}/g,
  'className={p-3 rounded-xl   group-hover:scale-110  group-hover:text-white transition-all duration-300}'
);

c = c.replace(
  'className="text-xl font-bold text-texto-principal mb-2 group-hover:text-principal transition-colors"',
  'className={	ext-xl font-bold text-texto-principal mb-2  transition-colors}'
);

fs.writeFileSync('src/pages/Services.tsx', c, 'utf8');
