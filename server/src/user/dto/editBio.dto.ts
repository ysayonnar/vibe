import { IsString, Length } from 'class-validator'

export class EditBioDto {
	@IsString({ message: 'Must be a string' })
	@Length(0, 1000, { message: 'Length must be from 0 to 1000 symbols' })
	bio: string
}
