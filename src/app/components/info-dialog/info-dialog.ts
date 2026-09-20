import { Component, ElementRef, input, viewChild } from '@angular/core';
import { OptionInfo } from '../../models/option-info';

@Component({
  imports: [],
  selector: 'app-info-dialog',
  styleUrl: './info-dialog.css',
  templateUrl: './info-dialog.html',
})
export class InfoDialog {
  readonly info = input.required<OptionInfo>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }
}
