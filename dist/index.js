'use strict';

const _log = console.log.bind(console);
const createPrefixLog = (spliter = '::', log = console.log.bind(console)) => {
    const cache = {};
    const randomNum = (str) => (Math.abs((str.charCodeAt(Math.floor(Math.random() * str.length)) - 40)) % 255) * 3;
    return (...args) => {
        var _a, _b;
        try {
            throw new Error('prefix log');
        }
        catch (e) {
            const stack = ((_a = e.stack) === null || _a === void 0 ? void 0 : _a.split('\n')[2]) || '';
            const callInfo = ((_b = stack.match(/at(.*)\((.*)\)/)) === null || _b === void 0 ? void 0 : _b.map(str => str.trim())) || [];
            const [, handler = ''] = callInfo;
            const prefixPatch = handler ? `${handler}${spliter}` : '';
            if (typeof args[0] !== 'string' && handler) {
                args.unshift(prefixPatch);
            }
            let prefix = args[0] || '';
            prefix = (!handler || prefix.startsWith(prefixPatch)) ? prefix : `${prefixPatch} ${prefix}`;
            const prefixList = prefix.split(spliter);
            prefix = prefixList.shift();
            let color = cache[prefix];
            if (!color) {
                const idx = Math.floor(Math.random() * 3);
                const bits = [randomNum(prefix).toString(16), randomNum(prefix).toString(16), randomNum(prefix).toString(16)];
                bits[idx] = Number(20).toString(16);
                color = `#${bits.join('')}`;
                cache[prefix] = color;
            }
            args[0] = `%c${prefix}${spliter}`;
            args.splice(1, 0, `color: ${color}; font-weight: bold`);
            args.splice(2, 0, prefixList.join(spliter));
            return log(...args);
        }
    };
};
const createPrefixLogAnsi = (spliter = '::', log = console.log.bind(console)) => {
    const cache = {};
    const formatter = (open, str, close) => `${open}${str}${close}`;
    const randomNum = (str) => (Math.abs((str.charCodeAt(Math.floor(Math.random() * str.length)) - 40)) % 255) * 3;
    return (...args) => {
        var _a, _b;
        try {
            throw new Error('prefix log');
        }
        catch (e) {
            const stack = ((_a = e.stack) === null || _a === void 0 ? void 0 : _a.split('\n')[2]) || '';
            const callInfo = ((_b = stack.match(/at(.*)\((.*)\)/)) === null || _b === void 0 ? void 0 : _b.map(str => str.trim())) || [];
            const [, handler = ''] = callInfo;
            const prefixPatch = handler ? `${handler}${spliter}` : '';
            if (typeof args[0] !== 'string' && handler) {
                args.unshift(prefixPatch);
            }
            let prefix = args[0] || '';
            prefix = (!handler || prefix.startsWith(prefixPatch)) ? prefix : `${prefixPatch} ${prefix}`;
            const prefixList = prefix.split(spliter);
            prefix = prefixList.shift();
            let color = cache[prefix];
            if (!color) {
                const idx = Math.floor(Math.random() * 3);
                const bits = [randomNum(prefix), randomNum(prefix), randomNum(prefix)];
                bits[idx] = 200;
                color = formatter(`\x1b[48;2;${bits.join(';')}m`, prefix, '\x1b[0m');
                cache[prefix] = color;
            }
            prefixList.unshift(color);
            args[0] = prefixList.join(spliter);
            return log(...args);
        }
    };
};
const overWriteLog = () => {
    console.log = createPrefixLog();
};
const prefixLog = createPrefixLog();
const patchLog = (key = '$prefixLog$') => {
    globalThis[key] = createPrefixLog();
    return key;
};

exports._log = _log;
exports.createPrefixLog = createPrefixLog;
exports.createPrefixLogAnsi = createPrefixLogAnsi;
exports.overWriteLog = overWriteLog;
exports.patchLog = patchLog;
exports.prefixLog = prefixLog;
