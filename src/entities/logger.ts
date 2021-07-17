/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCallerFile} from './_loggerImpl';

export interface Logger {
  get prefix(): string;
  get options(): {timestamp: boolean; prefix: boolean};

  _print(message: string, color: LogColor): void;
  _format(text: string, objects: any[], options?: {delemiter: string}): string;

  info(message: string, objects?: any[]): void;
  debug(message: string, objects?: any[]): void;
  warn(message: string, objects?: any[]): void;
  error(message: string, objects?: any[]): void;
  exception(message: string, exception: Error, objects?: any[]): void;
}

export type LogColor = 'grey' | 'green' | 'yellow' | 'red' | 'blue';

export class LoggerImpl implements Logger {
  name: string;

  constructor(namePayload: string) {
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

  _print(message: string, color: LogColor): void {
    const log = (msg: string) => process.stdout.write(`${msg}\n`);

    try {
      // eslint-disable-next-line node/no-extraneous-require
      const chalk = require('chalk');

      const prefix = chalk.grey(
        (this.options.prefix ? this.prefix + ' ' : '') +
          (this.options.timestamp ? new Date() + ' ' : '')
      );

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
    } catch (_error) {
      message +=
        (this.options.prefix ? this.prefix + ' ' : '') +
        (this.options.timestamp ? new Date() + ' ' : '');

      log('# Please install "chalk" for colored logging messages');
      log(message);
    }
  }

  _format(text: string, objects: any[], options?: {delemiter: string}): string {
    if (!options) {
      options = {delemiter: '{}'};
    }

    let next = text;
    let current = 0;

    while (
      !(current > objects.length) &&
      !(next.indexOf(options.delemiter) === -1)
    ) {
      next += next.replace(options.delemiter, objects[current]);
      current++;
    }

    return next;
  }

  info(message: string, objects?: any[]): void {
    this._print(objects ? this._format(message, objects) : message, 'green');
  }

  debug(message: string, objects?: any[]): void {
    this._print(objects ? this._format(message, objects) : message, 'blue');
  }

  warn(message: string, objects?: any[]): void {
    this._print(objects ? this._format(message, objects) : message, 'yellow');
  }

  error(message: string, objects?: any[]): void {
    this._print(objects ? this._format(message, objects) : message, 'red');
  }

  exception(message: string, exception: Error, objects?: any[]): void {
    message += ':\n' + exception;
    this._print(objects ? this._format(message, objects) : message, 'red');
  }
}

export function construct(options?: {name: string}): Logger {
  if (!options) {
    options = {name: getCallerFile().split('/').pop()?.split('.')[0] ?? ''};
  }

  return new LoggerImpl(options.name);
}
