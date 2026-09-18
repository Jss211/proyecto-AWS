import type { RegionInfo, SecurityIndicator } from '../types/cloud';

// Datos de regiones para el módulo de Infraestructura Global
export const globalRegions: RegionInfo[] = [
  {
    id: 'us-east-1',
    name: 'US East (N. Virginia)',
    location: 'Norteamérica',
    deployedServices: ['EC2', 'RDS', 'S3', 'VPC'],
    status: 'Operativa'
  },
  {
    id: 'eu-west-1',
    name: 'EU (Ireland)',
    location: 'Europa',
    deployedServices: ['EC2', 'S3', 'CloudFront'],
    status: 'Operativa'
  },
  {
    id: 'sa-east-1',
    name: 'South America (São Paulo)',
    location: 'Sudamérica',
    deployedServices: ['Route 53', 'CloudFront'],
    status: 'Degradada'
  }
];

// Datos de seguridad para el panel del Módulo de Seguridad
export const securityStatus: SecurityIndicator[] = [
  {
    id: 'iam-policies',
    name: 'Políticas IAM',
    status: 'Verde',
    description: 'El principio de mínimo privilegio está aplicado correctamente.'
  },
  {
    id: 'data-protection',
    name: 'Protección de Datos',
    status: 'Verde',
    description: 'Existen buckets de S3 sin versionado activo. Recomendado revisarlo.'
  },
  {
    id: 'compliance',
    name: 'Cumplimiento',
    status: 'Verde',
    description: 'Cumplimiento normativo validado mediante reglas de AWS Config.'
  },
  {
    id: 'account-protection',
    name: 'Protección de Cuenta',
    status: 'Amarillo',
    description: 'MFA (Autenticación multifactor) no está activado para el usuario root.'
  }
];
