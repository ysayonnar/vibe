import { IsString, Length } from 'class-validator'

export class CreateRoleDto {
	@IsString({ message: 'Must be a string' })
	@Length(4, 12, { message: 'Length must be from 4 to 12 symbols' })
	name: string

	@IsString({ message: 'Must be a string' })
	description: string
}
