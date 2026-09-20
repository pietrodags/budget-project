import { Service, computed, inject, signal } from '@angular/core';
import { Catalog } from './catalog';
import { SelectedService } from '../models/selected-service';
import { subtotalOf } from '../utils/pricing';

@Service()
export class Budget {
    private readonly catalog = inject(Catalog);

    private readonly selection = signal<SelectedService[]>([]);

    readonly selected = this.selection.asReadonly();

    readonly total = computed(() =>
        this.selection().reduce((sum, selected) => {
            const service = this.serviceById(selected.serviceId);

            return service ? sum + subtotalOf(service, selected.options) : sum;
        }, 0),
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

    /** Suma delta a una cantidad, sin bajar nunca del mínimo declarado en el JSON. */
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

    /** Busca un servicio del catálogo por su id. */
    private serviceById(serviceId: string) {
        return this.catalog.services().find((candidate) => candidate.id === serviceId);
    }

    /** Busca una opción dentro de un servicio del catálogo. */
    private optionById(serviceId: string, optionId: string) {
        return this.serviceById(serviceId)?.options.find((candidate) => candidate.id === optionId);
    }
}
