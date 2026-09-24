const fs=require('fs');
let c=fs.readFileSync('src/pages/Services.tsx','utf8');

c=c.replace(
  "details?: { region: string; tier: string; uptime: string; lastUpdated: string; };",
  "details?: { region: string; tier: string; uptime: string; lastUpdated: string; price: string; latency: string; };"
);

c=c.replace(/details: { region: 'us-east-1', tier: 'T3.Micro \\(Auto-Scaling\\)', uptime: '99.99%', lastUpdated: 'Hoy, 08:30 AM' }/g, "details: { region: 'us-east-1', tier: 'T3.Micro (Auto-Scaling)', uptime: '99.99%', lastUpdated: 'Hoy, 08:30 AM', price: '.0416/h', latency: '45ms' }");
c=c.replace(/details: { region: 'Global', tier: 'S3 Standard', uptime: '99.9999%', lastUpdated: 'Hace 2 dias' }/g, "details: { region: 'Global', tier: 'S3 Standard', uptime: '99.9999%', lastUpdated: 'Hace 2 dias', price: '.023/GB', latency: '120ms' }");
c=c.replace(/details: { region: 'us-east-1', tier: 'db.t3.small', uptime: '98.50%', lastUpdated: 'Hace 1 hora' }/g, "details: { region: 'us-east-1', tier: 'db.t3.small', uptime: '98.50%', lastUpdated: 'Hace 1 hora', price: '.068/h', latency: '15ms' }");
c=c.replace(/details: { region: 'Global', tier: 'Gratuito', uptime: '100%', lastUpdated: 'Hace 1 semana' }/g, "details: { region: 'Global', tier: 'Gratuito', uptime: '100%', lastUpdated: 'Hace 1 semana', price: 'Gratis', latency: '<10ms' }");
c=c.replace(/details: { region: 'us-east-1', tier: 'VPC con NAT Gateway', uptime: '100%', lastUpdated: 'Ayer' }/g, "details: { region: 'us-east-1', tier: 'VPC con NAT Gateway', uptime: '100%', lastUpdated: 'Ayer', price: '.045/h', latency: '<5ms' }");
c=c.replace(/details: { region: 'Global', tier: 'Zonas Alojadas Publicas', uptime: '100%', lastUpdated: 'Hace 1 mes' }/g, "details: { region: 'Global', tier: 'Zonas Alojadas Publicas', uptime: '100%', lastUpdated: 'Hace 1 mes', price: '.50/zona', latency: 'Global' }");
c=c.replace(/details: { region: 'Global', tier: 'Optimizacion de Cache', uptime: '99.99%', lastUpdated: 'Hoy, 10:15 AM' }/g, "details: { region: 'Global', tier: 'Optimizacion de Cache', uptime: '99.99%', lastUpdated: 'Hoy, 10:15 AM', price: '.085/GB', latency: '20ms' }");

fs.writeFileSync('src/pages/Services.tsx', c, 'utf8');
