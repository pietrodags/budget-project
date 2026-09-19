import { Service, computed, inject, signal } from '@angular/core';
import { Catalog } from './catalog';

@Service()
export class Budget {
    private readonly catalog = inject(Catalog);

    private readonly selectedIds = signal<string[]>([]);

    readonly selected = this.selectedIds.asReadonly();

    readonly total = computed(() =>
        this.catalog
            .services()
            .filter((service) => this.selectedIds().includes(service.id))
            .reduce((sum, service) => sum + service.price, 0),
    );

    isSelected(serviceId: string): boolean {
        return this.selectedIds().includes(serviceId);
    }

    toggle(serviceId: string): void {
        this.selectedIds.update((ids) =>
            ids.includes(serviceId)
                ? ids.filter((id) => id !== serviceId)
                : [...ids, serviceId],
        );
    }
}
