import { ServiceOption } from './service-option';

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    options: ServiceOption[];
}
