import { Logger } from 'tslog';
import type { ILogObj } from 'tslog';

export class LoggerService {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      type: 'pretty',
      pretty: {
        template:
          '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ',
        errorTemplate:
          '\n{{errorName}} {{errorMessage}}\nstack:\n{{errorStack}}',
        errorStackTemplate:
          '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
        style: true,
        timeZone: 'local',
        styles: {
          yyyy: ['black', 'bold'],
          mm: ['black', 'bold'],
          dd: ['black', 'bold'],
          hh: ['black', 'bold'],
          MM: ['black', 'bold'],
          ss: ['black', 'bold'],
          ms: ['black', 'bold'],
          name: ['white', 'bold'],
          logLevelName: {
            '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
            SILLY: ['bold', 'white'],
            DEBUG: ['bold', 'green'],
            INFO: ['bold', 'blue'],
            WARN: ['bold', 'yellow'],
            ERROR: ['bold', 'red'],
            FATAL: ['bold', 'redBright'],
          },
        },
      },
    });
  }

  public log(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  public error(message: string, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }

  public warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }
}
