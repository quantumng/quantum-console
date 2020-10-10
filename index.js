(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QuantumConsole = factory());
}(this, (function () { 'use strict';

    var QuanConsole = /** @class */ (function () {
        function QuanConsole(config) {
            if (config === void 0) { config = { url: '' }; }
            this.config = {
                url: ''
            };
            if (!config.url) {
                console.warn('[QuanConsole] You must input a url to inject console!');
                return;
            }
            this.config = config;
            this.init();
        }
        QuanConsole.prototype.init = function () {
            if (this.config.entry) {
                this.setEntry(this.config.entry);
            }
            var showConsole = this.getQuery('console');
            if (showConsole) {
                this.showConsole(showConsole === 'show');
            }
        };
        QuanConsole.prototype.showConsole = function (show) {
            var _this = this;
            this.buildScript(this.config.url, function () {
                // @ts-ignore
                _this.config.consoleConfig ? eruda.init(_this.config.consoleConfig) : eruda.init();
                if (_this.config.plugins && _this.config.plugins.length) {
                    for (var i = 0, len = _this.config.plugins.length; i < len; i += 1) {
                        var plugin = _this.config.plugins[i];
                        // @ts-ignore
                        eruda.add(plugin);
                    }
                }
                if (show) {
                    try {
                        // @ts-ignore
                        eruda.show();
                    }
                    catch (e) { }
                    window.addEventListener('load', function () {
                        // @ts-ignore
                        eruda.show();
                    });
                }
            });
        };
        QuanConsole.prototype.setEntry = function (entry) {
            var _this = this;
            var ele = document.querySelector(entry);
            var count = 0;
            if (ele) {
                ele.addEventListener('click', function () {
                    count += 1;
                    if (count > 5) {
                        count = -999999;
                        _this.showConsole(true);
                    }
                });
            }
        };
        QuanConsole.prototype.getQuery = function (key) {
            var reg = new RegExp('(?:#|&)' + key + '=([^&]*)(&|$)');
            var matched = window.location.hash.match(reg);
            var res = !matched ? '' : decodeURIComponent(matched[1]);
            return res || this.getQueryByName(key);
        };
        QuanConsole.prototype.getQueryByName = function (name) {
            name = name.replace(/[\[\]]/g, "\\$&");
            var url = window.location.href;
            var reg = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            var res = reg.exec(url);
            if (!res)
                return null;
            if (!res[2])
                return '';
            return decodeURIComponent(res[2].replace(/\+/g, " "));
        };
        QuanConsole.prototype.buildScript = function (url, callback) {
            var _a;
            var flag = false;
            var ele = document.createElement('script');
            ele.type = 'text/javascript';
            ele.src = url;
            // @ts-ignore
            ele.onload = ele.onreadystatechange = function () {
                // console.log(this.readyState);
                // @ts-ignore
                if (!flag && (!this.readyState || this.readyState === 'complete')) {
                    flag = true;
                    callback();
                }
            };
            var firstScript = document.getElementsByTagName('script')[0];
            (_a = firstScript.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(ele, firstScript);
        };
        return QuanConsole;
    }());

    return QuanConsole;

})));
