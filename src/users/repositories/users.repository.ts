import type { UserModel } from '@database/models.js';
import type { UserEntity } from '../entities/user.entity.js';
import type { IUsersRepository } from '../types/users.repository.interface.js';
import { inject, injectable } from 'inversify';
import { types } from '../../types.js';
import type { PrismaService } from '../../database/prisma.service.js';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(types.IPrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.user.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: UserModel['email']): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: { email },
		});
	}
}
