import { IsEmail, IsString, Length } from 'class-validator'

export class loginDto {
	@IsString({ message: 'Must be string' })
	@IsEmail({}, { message: 'Incorrect email' })
	email: string

	@IsString({ message: 'Must be string' })
	@Length(4, 16, { message: 'passwrod must be from 4 to 16 symbols' })
	password: string
}
