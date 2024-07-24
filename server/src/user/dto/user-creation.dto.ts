import { IsEmail, IsString, Length } from 'class-validator'

export class UserCreationDto {
	@IsString({ message: 'Must be string' })
	@Length(4, 16, { message: 'username must be from 4 to 16 symbols' })
	username: string

	@IsString({ message: 'Must be a string' })
	@IsEmail({}, { message: 'Incorrect email' })
	email: string

	@IsString({ message: 'Must be a string' })
	@Length(4, 16, { message: 'password must be from 4 to 16 symbols' })
	password_hash: string
}
