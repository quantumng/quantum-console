(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QuantumConsole = factory());
}(this, (function () { 'use strict';

    var flag = false;
    function getQuery(key) {
        var reg = new RegExp('(?:#|&)' + key + '=([^&]*)(&|$)');
        var matched = window.location.hash.match(reg);
        var res = !matched ? '' : decodeURIComponent(matched[1]);
        return res || getQueryByName(key);
    }
    function getQueryByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var url = window.location.href;
        var reg = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var res = reg.exec(url);
        if (!res)
            return null;
        if (!res[2])
            return '';
        return decodeURIComponent(res[2].replace(/\+/g, " "));
    }
    function buildScript(url, callback) {
        var _a;
        if (flag)
            return;
        var ele = document.createElement('script');
        ele.type = 'text/javascript';
        ele.src = url;
        ele.onload = function () {
            flag = true;
            callback();
        };
        var firstScript = document.getElementsByTagName('script')[0];
        (_a = firstScript.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(ele, firstScript);
    }
    function nextTick(cb) {
        if (typeof setImmediate === 'function') {
            setImmediate(ensureCallable(cb));
        }
        else {
            setTimeout(ensureCallable(cb), 0);
        }
    }
    function ensureCallable(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return fn;
    }
    function $(selector, el) {
        if (!el) {
            el = document;
        }
        return el.querySelector(selector);
    }

    var QuanConsole = (function () {
        function QuanConsole(config) {
            if (config === void 0) { config = { url: '' }; }
            this.config = {
                url: ''
            };
            if (!config.url) {
                console.warn('[QuantumConsole] You must input a url to inject console!');
                return;
            }
            this.config = config;
            this.init();
        }
        QuanConsole.prototype.init = function () {
            if (this.config.entry) {
                this.setEntry(this.config.entry);
            }
            var showConsole = getQuery('console');
            if (showConsole) {
                this.showConsole(showConsole === 'show');
            }
        };
        QuanConsole.prototype.showConsole = function (show) {
            var _this = this;
            buildScript(this.config.url, function () {
                _this.config.consoleConfig ? eruda.init(_this.config.consoleConfig) : eruda.init();
                if (_this.config.plugins && _this.config.plugins.length) {
                    for (var i = 0, len = _this.config.plugins.length; i < len; i += 1) {
                        var plugin = _this.config.plugins[i];
                        eruda.add(plugin);
                    }
                }
                if (show) {
                    try {
                        eruda.show();
                    }
                    catch (e) { }
                    window.addEventListener('load', function () {
                        eruda.show();
                    });
                }
            });
        };
        QuanConsole.prototype.setEntry = function (entry) {
            var _this = this;
            nextTick(function () {
                var ele = $(entry);
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
            });
        };
        return QuanConsole;
    }());

    return QuanConsole;

})));
