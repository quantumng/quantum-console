import { IConfig } from './typing';

export default class QuanConsole {
    constructor(config: IConfig = { url: '' }) {
        if (!config.url) {
            console.warn('[QuanConsole] You must input a url to inject console!');
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
        const showConsole = this.getQuery('console');
        if (showConsole) {
            this.showConsole(showConsole === 'show');
        }
    }

    showConsole(show: boolean) {
        const _this = this;
        this.buildScript(this.config.url, function() {
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
        const ele = document.querySelector(entry);
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
    }

    getQuery(key: string) {
        const reg = new RegExp('(?:#|&)' + key + '=([^&]*)(&|$)');
        const matched = window.location.hash.match(reg);
        const res = !matched ? '' : decodeURIComponent(matched[1]);
        return res || this.getQueryByName(key);
    }

    getQueryByName(name: string) {
        name = name.replace(/[\[\]]/g, "\\$&");
        const url = window.location.href;
        const reg = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const res = reg.exec(url);
        if (!res) return null;
        if (!res[2]) return '';
        return decodeURIComponent(res[2].replace(/\+/g, " "));
    }

    buildScript(url: string, callback: () => void): void {
        let flag = false;
        const ele = document.createElement('script');
        ele.type = 'text/javascript';
        ele.src = url;
        // @ts-ignore
        ele.onload = ele.onreadystatechange = function() {
            // console.log(this.readyState);
            // @ts-ignore
            if ( !flag && (!this.readyState || this.readyState === 'complete') ) {
                flag = true
                callback()
            }
        }
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(ele, firstScript);
    }
};