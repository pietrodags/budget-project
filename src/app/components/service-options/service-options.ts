import { Component, inject, input } from '@angular/core';
import { Service } from '../../models/service';
import { Budget } from '../../services/budget';
import { InfoDialog } from '../info-dialog/info-dialog';

@Component({
  imports: [InfoDialog],
  selector: 'app-service-options',
  styleUrl: './service-options.css',
  templateUrl: './service-options.html',
})
export class ServiceOptions {
  readonly service = input.required<Service>();

  protected readonly budget = inject(Budget);
}
