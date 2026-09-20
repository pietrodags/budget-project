import { Service } from '../models/service';

export function subtotalOf(service: Service, quantities: Record<string, number>): number {
    return service.options.reduce(
        (sum, option) => sum + (quantities[option.id] ?? 0) * option.unitPrice,
        service.price,
    );
}
