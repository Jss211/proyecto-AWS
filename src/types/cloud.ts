export interface AwsService {
  id: string;
  name: string;
  category: string;
  description: string;
  mainFunction: string;
  utilizationStatus: 'Activo' | 'Inactivo' | 'En uso' | 'Disponible';
  pricing?: string;
}

export interface CostItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  estimatedHours: number;
  monthlyCost: number;
  annualCost: number;
}

export interface RegionInfo {
  id: string;
  name: string;
  location: string;
  deployedServices: string[];
  status: 'Operativa' | 'Degradada' | 'Caída';
}

export interface SecurityIndicator {
  id: string;
  name: string;
  status: 'Verde' | 'Amarillo' | 'Rojo';
  description: string;
}

export interface CloudProposal {
  id: string;
  name: string;
  appType: string;
  description: string;
  region: string;
  estimatedUsers: number;
  availability: string;
  services: string[];
  migrationGoal: string;
  status?: 'Saludable' | 'En Riesgo' | 'Crítico';
}
