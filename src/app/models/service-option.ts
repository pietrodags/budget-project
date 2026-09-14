import { OptionInfo } from './option-info';

export interface ServiceOption {
    id: string;
    name: string;
    unitPrice: number;
    min: number;
    info: OptionInfo;
}
