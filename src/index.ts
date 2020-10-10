import { IConfig } from './typing';
import { getQuery, buildScript, nextTick, $ } from './utils';

export default class QuanConsole {
    constructor(config: IConfig = { url: '' }) {
        if (!config.url) {
            console.warn('[QuantumConsole] You must input a url to inject console!');
            return;
        }
        this.config = config;
        this.init();
    }

    config: IConfig = {
        url: ''
    }

    init() {
        if (this.config.entry) {
            this.setEntry(this.config.entry);
        }
        const showConsole = getQuery('console');
        if (showConsole) {
            this.showConsole(showConsole === 'show');
        }
    }

    showConsole(show: boolean) {
        const _this = this;
        buildScript(this.config.url, function() {
            // @ts-ignore
            _this.config.consoleConfig ? eruda.init(_this.config.consoleConfig) : eruda.init();
            if (_this.config.plugins && _this.config.plugins.length) {
                for (let i = 0, len = _this.config.plugins.length; i < len; i+=1) {
                    const plugin = _this.config.plugins[i];
                    // @ts-ignore
                    eruda.add(plugin);
                }
            }
            if (show) {
                try {
                    // @ts-ignore
                    eruda.show()
                } catch (e) {}
                window.addEventListener('load', function() {
                    // @ts-ignore
                    eruda.show()
                });
            }
        });
    }

    setEntry(entry: string): void {
        const _this = this;
        nextTick(function() {
            const ele = $(entry);
            let count = 0;
            if (ele) {
                ele.addEventListener('click', function() {
                    count+=1;
                    if (count > 5) {
                        count = -999999;
                        _this.showConsole(true);
                    }
                });
            }
        });
    }
};