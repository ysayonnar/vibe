import { IsString, Length } from 'class-validator'

export class BanUserDto {
	@IsString({ message: 'Must be a string' })
	@Length(4, 20, { message: 'Length must be from 4 to 20 symbols' })
	banReason: string
}
