import type { UserLoginDto } from '../DTO/user-login.dto.js';
import type { UserRegisterDto } from '../DTO/user-register.dto.js';
import type { UserEntity } from '../entities/user.entity.js';

export interface IUsersService {
	createUser: (dto: UserRegisterDto) => Promise<UserEntity | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
