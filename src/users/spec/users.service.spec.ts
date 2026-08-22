import 'reflect-metadata';
import { Container } from 'inversify';
import type { IConfigService } from '../../config/types/config.service.interface.js';
import type { IUsersRepository } from '../types/users.repository.interface.js';
import type { IUsersService } from '../types/users.service.interface.js';
import { types } from '../../types.js';
import { UsersService } from '../services/users.service.js';
import { createUserMock } from './mock.js';
import type { UserEntity } from '../entities/user.entity.js';
import type { UserModel } from '@database/models.js';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(types.IUsersService).to(UsersService);
	container.bind<IUsersRepository>(types.IUsersRepository).toConstantValue(usersRepositoryMock);
	container.bind<IConfigService>(types.IConfigService).toConstantValue(configServiceMock);

	configService = container.get<IConfigService>(types.IConfigService);
	usersRepository = container.get<IUsersRepository>(types.IUsersRepository);
	usersService = container.get<IUsersService>(types.IUsersService);
});

describe('User service', () => {
	it('create user', async () => {
		const userFakeId = 1;

		configService.get = jest.fn().mockReturnValueOnce('10');
		usersRepository.create = jest.fn().mockImplementationOnce((user: UserEntity): UserModel => ({
			name: user.name,
			password: user.password,
			email: user.email,
			id: userFakeId,
		}));

		const createdUser = (await usersService.createUser(createUserMock)) as UserModel;

		expect(createdUser.id).toEqual(userFakeId);
		expect(createdUser.password).not.toEqual(createUserMock.password);
	});
});
