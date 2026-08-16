import type { UserModel } from '@database/models.js';
import type { UserLoginDto } from '../DTO/user-login.dto.js';
import type { UserRegisterDto } from '../DTO/user-register.dto.js';

export interface IUsersService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	singJWT: (email: string, secret?: string) => Promise<string>;
}
