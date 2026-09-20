import { Service } from '../models/service';

/**
 * Precio de un servicio con las cantidades elegidas en sus opciones.
 * Un servicio sin opciones cuesta su precio base.
 */
export function subtotalOf(service: Service, quantities: Record<string, number>): number {
    return service.options.reduce(
        (sum, option) => sum + (quantities[option.id] ?? 0) * option.unitPrice,
        service.price,
    );
}
