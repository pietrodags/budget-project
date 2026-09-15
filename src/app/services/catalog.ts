import { Service, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ServiceConfig } from '../models/service.config';

@Service()
export class Catalog {
    private readonly resource = httpResource<ServiceConfig>(() => 'data/services.json');

    readonly services = computed(() => this.resource.value()?.services ?? []);
    readonly isLoading = this.resource.isLoading;
    readonly error = this.resource.error;
}
