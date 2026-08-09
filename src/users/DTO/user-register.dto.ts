import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Invalid password' })
	@MinLength(3, { message: 'Minimum number of password characters 3' })
	password: string;

	@IsString({ message: 'Invalid name' })
	name: string;
}
