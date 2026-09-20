import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BudgetDetail } from './pages/budget-detail/budget-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pressupost/:id', component: BudgetDetail },
  { path: '**', redirectTo: '' },
];
