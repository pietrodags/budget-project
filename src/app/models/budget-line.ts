import { ChosenOption } from './chosen-option';

export interface BudgetLine {
    serviceId: string;
    serviceName: string;
    basePrice: number;
    options: ChosenOption[];
    subtotal: number;
}
