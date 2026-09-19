import { Component, inject } from '@angular/core';
import { Catalog } from '../../services/catalog';
import { Budget } from '../../services/budget';

@Component({
  imports: [],
  selector: 'app-service-list',
  styleUrl: './service-list.css',
  templateUrl: './service-list.html',
})
export class ServiceList {
  protected readonly catalog = inject(Catalog);
  protected readonly budget = inject(Budget);
}
