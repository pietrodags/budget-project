import { Component, computed, inject, signal } from '@angular/core';
import { BudgetHistory } from '../../services/budget-history';

type SortBy = 'date' | 'amount' | 'name';

@Component({
  imports: [],
  selector: 'app-budget-list',
  styleUrl: './budget-list.css',
  templateUrl: './budget-list.html',
})
export class BudgetList {
  protected readonly history = inject(BudgetHistory);

  protected readonly criteria: { id: SortBy; label: string }[] = [
    { id: 'date', label: 'Data' },
    { id: 'amount', label: 'Import' },
    { id: 'name', label: 'Nom' },
  ];

  protected readonly search = signal('');

  protected readonly sortBy = signal<SortBy>('date');

  protected readonly visible = computed(() => {
    const text = this.search().trim().toLowerCase();
    const criterion = this.sortBy();

    const found = this.history
      .saved()
      .filter((budget) => budget.client.name.toLowerCase().includes(text));

    return found.sort((a, b) => {
      if (criterion === 'amount') {
        return b.total - a.total;
      }

      if (criterion === 'name') {
        return a.client.name.localeCompare(b.client.name);
      }

      return b.createdAt.localeCompare(a.createdAt);
    });
  });

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.search.set(input.value);
  }

  protected setSortBy(criterion: SortBy): void {
    this.sortBy.set(criterion);
  }
}
