let flag = false;

export function getQuery(key: string) {
    const reg = new RegExp('(?:#|&)' + key + '=([^&]*)(&|$)');
    const matched = window.location.hash.match(reg);
    const res = !matched ? '' : decodeURIComponent(matched[1]);
    return res || getQueryByName(key);
}

function getQueryByName(name: string) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const url = window.location.href;
    const reg = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const res = reg.exec(url);
    if (!res) return null;
    if (!res[2]) return '';
    return decodeURIComponent(res[2].replace(/\+/g, " "));
}

export function buildScript(url: string, callback: () => void): void {
    if (flag) return;
    const ele = document.createElement('script');
    ele.type = 'text/javascript';
    ele.src = url;
    ele.onload = function() {
        flag = true;
        callback();
    }
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(ele, firstScript);
}

type TFn = () => void;

export function nextTick(cb: TFn) {
    if (typeof setImmediate === 'function') {
      setImmediate(ensureCallable(cb));
    } else {
      setTimeout(ensureCallable(cb), 0);
    }
}

function ensureCallable<T>(fn: T): T {
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return fn;
}

export function $(selector: string, el?: any) {
    if (!el) {
        el = document;
    }
    return el.querySelector(selector);
}