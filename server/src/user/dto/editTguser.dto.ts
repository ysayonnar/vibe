import { IsString, Length } from 'class-validator'

export class EditTguserDto {
	@IsString({ message: 'Must be a string' })
	@Length(2, 20, { message: 'Length must be form 2 to 20 symbols' })
	telegram_username: string
}
