import type { AwsService } from '../types/cloud';

export const awsServices: AwsService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Cómputo',
    description: 'Servidores virtuales en la nube seguros y redimensionables. Capacidad informática escalable para ejecutar aplicaciones corporativas.',
    mainFunction: 'Cómputo escalable y servidores web',
    utilizationStatus: 'Activo',
    pricing: '$0.0416 / hora'
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Almacenamiento',
    description: 'Almacenamiento de objetos para guardar y recuperar cualquier cantidad de datos de forma segura, con una durabilidad del 99.999999999%.',
    mainFunction: 'Almacenamiento de backups estáticos',
    utilizationStatus: 'Activo',
    pricing: '$0.023 / GB'
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Base de Datos',
    description: 'Servicio de base de datos relacional administrado. Facilita la configuración, el funcionamiento y el escalado de bases de datos en la nube.',
    mainFunction: 'Base de datos transaccional SQL',
    utilizationStatus: 'En uso',
    pricing: '$0.115 / hora'
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    category: 'Seguridad',
    description: 'Administración de acceso a recursos de AWS de forma segura. Control centralizado de usuarios, permisos y credenciales.',
    mainFunction: 'Control de identidades y permisos',
    utilizationStatus: 'Activo',
    pricing: 'Gratuito'
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Redes',
    description: 'Sección aislada lógicamente de la nube de AWS donde se pueden lanzar recursos en una red virtual definida.',
    mainFunction: 'Aislamiento de red privada',
    utilizationStatus: 'Activo',
    pricing: 'Gratuito'
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Redes',
    description: 'Servicio web de DNS en la nube escalable y de alta disponibilidad, diseñado para enrutar usuarios a las aplicaciones de Internet.',
    mainFunction: 'Resolución DNS global',
    utilizationStatus: 'Disponible',
    pricing: '$0.50 / zona'
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Redes',
    description: 'Servicio de red de entrega de contenido (CDN) rápida que distribuye datos y aplicaciones a clientes a nivel mundial.',
    mainFunction: 'CDN y protección DDoS',
    utilizationStatus: 'Inactivo',
    pricing: '$0.085 / GB'
  }
];
