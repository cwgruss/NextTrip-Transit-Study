import {Constructor} from './constructor';

export type Mixin<T extends Constructor> = InstanceType<T>;
