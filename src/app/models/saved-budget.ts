import { BudgetLine } from './budget-line';
import { Client } from './client';

export interface SavedBudget {
    id: string;
    createdAt: string;
    client: Client;
    lines: BudgetLine[];
    total: number;
}
