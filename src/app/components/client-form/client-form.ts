import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../../services/budget';
import { BudgetHistory } from '../../services/budget-history';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-client-form',
  styleUrl: './client-form.css',
  templateUrl: './client-form.html',
})
export class ClientForm {
  protected readonly budget = inject(Budget);

  private readonly history = inject(BudgetHistory);

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected readonly submitted = signal(false);

  protected showError(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    if (this.budget.selected().length === 0) {
      return;
    }

    this.history.save(this.form.getRawValue(), this.budget.lines(), this.budget.total());

    this.form.reset();
    this.budget.clear();
    this.submitted.set(false);
  }
}
