import { IConfig } from './typing';
export default class QuanConsole {
    constructor(config?: IConfig);
    config: IConfig;
    init(): void;
    showConsole(show: boolean): void;
    setEntry(entry: string): void;
}
