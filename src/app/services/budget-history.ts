import { Service, signal } from '@angular/core';
import { BudgetLine } from '../models/budget-line';
import { Client } from '../models/client';
import { SavedBudget } from '../models/saved-budget';

@Service()
export class BudgetHistory {
    private readonly budgets = signal<SavedBudget[]>([]);

    readonly saved = this.budgets.asReadonly();

    save(client: Client, lines: BudgetLine[], total: number): void {
        const budget: SavedBudget = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            client,
            lines,
            total,
        };

        this.budgets.update((items) => [budget, ...items]);
    }
}
