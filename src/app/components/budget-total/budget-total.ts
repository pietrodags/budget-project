import { Component, inject } from '@angular/core';
import { Budget } from '../../services/budget';

@Component({
  imports: [],
  selector: 'app-budget-total',
  styleUrl: './budget-total.css',
  templateUrl: './budget-total.html',
})
export class BudgetTotal {
  protected readonly budget = inject(Budget);
}
