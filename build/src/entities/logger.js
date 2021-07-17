"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.construct = exports.LoggerImpl = void 0;
const _loggerImpl_1 = require("./_loggerImpl");
class LoggerImpl {
    constructor(namePayload) {
        this.name = namePayload;
    }
    get prefix() {
        return this.name;
    }
    get options() {
        return {
            timestamp: true,
            prefix: true,
        };
    }
    _print(message, color) {
        const log = (msg) => process.stdout.write(`${msg}\n`);
        try {
            // eslint-disable-next-line node/no-extraneous-require
            const chalk = require('chalk');
            const prefix = chalk.grey((this.options.prefix ? this.prefix + ' ' : '') +
                (this.options.timestamp ? new Date() + ' ' : ''));
            switch (color) {
                case 'blue': {
                    log(prefix + chalk.blue(message));
                    break;
                }
                case 'green': {
                    log(prefix + chalk.green(message));
                    break;
                }
                case 'grey': {
                    log(prefix + chalk.grey(message));
                    break;
                }
                case 'red': {
                    log(prefix + chalk.red(message));
                    break;
                }
                case 'yellow': {
                    log(prefix + chalk.yellow(message));
                    break;
                }
            }
        }
        catch (_error) {
            message +=
                (this.options.prefix ? this.prefix + ' ' : '') +
                    (this.options.timestamp ? new Date() + ' ' : '');
            log('# Please install "chalk" for colored logging messages');
            log(message);
        }
    }
    _format(text, objects, options) {
        if (!options) {
            options = { delemiter: '{}' };
        }
        let next = text;
        let current = 0;
        while (!(current > objects.length) &&
            !(next.indexOf(options.delemiter) === -1)) {
            next += next.replace(options.delemiter, objects[current]);
            current++;
        }
        return next;
    }
    info(message, objects) {
        this._print(objects ? this._format(message, objects) : message, 'green');
    }
    debug(message, objects) {
        this._print(objects ? this._format(message, objects) : message, 'blue');
    }
    warn(message, objects) {
        this._print(objects ? this._format(message, objects) : message, 'yellow');
    }
    error(message, objects) {
        this._print(objects ? this._format(message, objects) : message, 'red');
    }
    exception(message, exception, objects) {
        message += ':\n' + exception;
        this._print(objects ? this._format(message, objects) : message, 'red');
    }
}
exports.LoggerImpl = LoggerImpl;
function construct(options) {
    var _a, _b;
    if (!options) {
        options = { name: (_b = (_a = _loggerImpl_1.getCallerFile().split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]) !== null && _b !== void 0 ? _b : '' };
    }
    return new LoggerImpl(options.name);
}
exports.construct = construct;
//# sourceMappingURL=logger.js.map