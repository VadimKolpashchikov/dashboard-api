import { inject, injectable } from 'inversify';
import type { UserLoginDto } from '../DTO/user-login.dto.js';
import type { UserRegisterDto } from '../DTO/user-register.dto.js';
import { UserEntity } from '../entities/user.entity.js';
import type { IUsersService } from '../types/users.service.interface.js';
import type { IConfigService } from '../../config/types/config.service.interface.js';
import { types } from '../../types.js';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(types.IConfigService) protected configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const user = new UserEntity(email, name);
		const salt = this.configService.get('SALT');

		await user.setPassword(password, Number(salt));
		// Проверка на существование пользователя
		return null;
		// return user;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
