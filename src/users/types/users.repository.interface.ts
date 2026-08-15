import type { UserModel } from '@database/models.js';
import type { UserEntity } from '../entities/user.entity.js';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: UserModel['email']) => Promise<UserModel | null>;
}
