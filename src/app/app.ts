import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceList } from './components/service-list/service-list';
import { BudgetTotal } from './components/budget-total/budget-total';

@Component({
  imports: [RouterOutlet, ServiceList, BudgetTotal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('budget-project');
}
