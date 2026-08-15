import { inject, injectable } from 'inversify';
import type { UserLoginDto } from '../DTO/user-login.dto.js';
import type { UserRegisterDto } from '../DTO/user-register.dto.js';
import { UserEntity } from '../entities/user.entity.js';
import type { IUsersService } from '../types/users.service.interface.js';
import type { IConfigService } from '../../config/types/config.service.interface.js';
import { types } from '../../types.js';
import type { IUsersRepository } from '../types/users.repository.interface.js';
import type { UserModel } from '@database/models.js';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(types.IConfigService) protected configService: IConfigService,
		@inject(types.IUsersRepository) protected userRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		if (await this.userRepository.find(email)) {
			return null;
		}
		const user = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, Number(salt));

		return this.userRepository.create(user);
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(dto.email);
		if (!existedUser) {
			return false;
		}

		return await UserEntity.comparePassword(dto.password, existedUser.password);
	}
}
