import { injectable } from 'inversify';
import type { UserLoginDto } from '../DTO/user-login.dto.js';
import type { UserRegisterDto } from '../DTO/user-register.dto.js';
import { UserEntity } from '../entities/user.entity.js';
import type { IUsersService } from '../types/users.service.interface.js';

@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const user = new UserEntity(email, name);
		await user.setPassword(password);
		// Проверка на существование пользователя
		return user;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
