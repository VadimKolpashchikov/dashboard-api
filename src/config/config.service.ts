import { inject, injectable } from 'inversify';
import type { ILogger } from '../logger/logger.interface.js';
import { types } from '../types.js';
import type { IConfigService } from './types/config.service.interface.js';
import { config, type DotenvConfigOutput, type DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(types.ILogger) protected logger: ILogger) {
		const result: DotenvConfigOutput = config({ quiet: true });
		if (result.error) {
			this.logger.error(`[${this.constructor.name}]: Error reading config file`);
		} else if (result.parsed) {
			this.logger.log(`[${this.constructor.name}]: Configuration loaded successful`);
			this.config = result.parsed;
		} else {
			this.logger.error(`[${this.constructor.name}]: Unexpected Error`);
		}
	}

	get(key: string): string | undefined {
		return this.config[key];
	}
}
