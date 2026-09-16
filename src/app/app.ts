import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceList } from './components/service-list/service-list';

@Component({
  imports: [RouterOutlet, ServiceList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('budget-project');
}
