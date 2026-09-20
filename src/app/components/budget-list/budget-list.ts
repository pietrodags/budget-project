import { Component, inject } from '@angular/core';
import { BudgetHistory } from '../../services/budget-history';

@Component({
  imports: [],
  selector: 'app-budget-list',
  styleUrl: './budget-list.css',
  templateUrl: './budget-list.html',
})
export class BudgetList {
  protected readonly history = inject(BudgetHistory);
}
