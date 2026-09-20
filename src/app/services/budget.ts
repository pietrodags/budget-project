import { Service, computed, inject, signal } from '@angular/core';
import { Catalog } from './catalog';
import { BudgetLine } from '../models/budget-line';
import { ChosenOption } from '../models/chosen-option';
import { SelectedService } from '../models/selected-service';
import { subtotalOf } from '../utils/pricing';

@Service()
export class Budget {
    private readonly catalog = inject(Catalog);

    private readonly selection = signal<SelectedService[]>([]);

    readonly selected = this.selection.asReadonly();

    readonly lines = computed(() => {
        const lines: BudgetLine[] = [];

        for (const selected of this.selection()) {
            const service = this.serviceById(selected.serviceId);

            if (!service) {
                continue;
            }

            const options: ChosenOption[] = [];

            for (const option of service.options) {
                options.push({
                    optionId: option.id,
                    optionName: option.name,
                    unitPrice: option.unitPrice,
                    quantity: selected.options[option.id] ?? 0,
                });
            }

            lines.push({
                serviceId: service.id,
                serviceName: service.name,
                basePrice: service.price,
                options,
                subtotal: subtotalOf(service, selected.options),
            });
        }

        return lines;
    });

    readonly total = computed(() =>
        this.lines().reduce((sum, line) => sum + line.subtotal, 0),
    );

    isSelected(serviceId: string): boolean {
        return this.selection().some((selected) => selected.serviceId === serviceId);
    }

    toggle(serviceId: string): void {
        if (this.isSelected(serviceId)) {
            this.selection.update((items) =>
                items.filter((selected) => selected.serviceId !== serviceId),
            );

            return;
        }

        const service = this.serviceById(serviceId);

        if (!service) {
            return;
        }

        const options: Record<string, number> = {};

        for (const option of service.options) {
            options[option.id] = option.min;
        }

        this.selection.update((items) => [...items, { serviceId, options }]);
    }

    quantityOf(serviceId: string, optionId: string): number {
        const selected = this.selection().find((item) => item.serviceId === serviceId);

        return selected?.options[optionId] ?? 0;
    }

    increase(serviceId: string, optionId: string): void {
        this.changeQuantity(serviceId, optionId, 1);
    }

    decrease(serviceId: string, optionId: string): void {
        this.changeQuantity(serviceId, optionId, -1);
    }

    clear(): void {
        this.selection.set([]);
    }

    private changeQuantity(serviceId: string, optionId: string, delta: number): void {
        const option = this.optionById(serviceId, optionId);

        if (!option) {
            return;
        }

        const quantity = Math.max(option.min, this.quantityOf(serviceId, optionId) + delta);

        this.selection.update((items) =>
            items.map((selected) =>
                selected.serviceId === serviceId
                    ? { ...selected, options: { ...selected.options, [optionId]: quantity } }
                    : selected,
            ),
        );
    }

    private serviceById(serviceId: string) {
        return this.catalog.services().find((candidate) => candidate.id === serviceId);
    }

    private optionById(serviceId: string, optionId: string) {
        return this.serviceById(serviceId)?.options.find((candidate) => candidate.id === optionId);
    }
}
