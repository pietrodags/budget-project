import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BudgetHistory } from '../../services/budget-history';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-budget-detail',
  styleUrl: './budget-detail.css',
  templateUrl: './budget-detail.html',
})
export class BudgetDetail {
  readonly id = input.required<string>();

  private readonly history = inject(BudgetHistory);

  protected readonly budget = computed(() =>
    this.history.saved().find((saved) => saved.id === this.id()),
  );
}
