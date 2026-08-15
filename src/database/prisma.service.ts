import { PrismaClient } from '@database/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { inject, injectable } from 'inversify';
import type { ILogger } from '../logger/logger.interface.js';
import { types } from '../types.js';
import type { IConfigService } from '../config/types/config.service.interface.js';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(
		@inject(types.ILogger) protected logger: ILogger,
		@inject(types.IConfigService) protected configService: IConfigService,
	) {
		const adapter = new PrismaBetterSqlite3({
			url: configService.get('DATABASE_URL'),
		});
		this.client = new PrismaClient({ adapter });
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService]: Connection to database successful');
		} catch (error) {
			let message = '[PrismaService]: Connection to database failed!';
			if (error instanceof Error) {
				message += ` \n ${error.message}`;
			}
			this.logger.error(message);
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
