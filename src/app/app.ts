import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceList } from './components/service-list/service-list';
import { BudgetTotal } from './components/budget-total/budget-total';
import { ClientForm } from './components/client-form/client-form';
import { BudgetList } from './components/budget-list/budget-list';

@Component({
  imports: [RouterOutlet, ServiceList, BudgetTotal, ClientForm, BudgetList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('budget-project');
}
