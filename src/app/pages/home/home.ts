import { Component } from '@angular/core';
import { ServiceList } from '../../components/service-list/service-list';
import { BudgetTotal } from '../../components/budget-total/budget-total';
import { ClientForm } from '../../components/client-form/client-form';
import { BudgetList } from '../../components/budget-list/budget-list';

@Component({
  imports: [ServiceList, BudgetTotal, ClientForm, BudgetList],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
