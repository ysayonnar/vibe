import { IsNumber, IsString, Length } from 'class-validator'

export class ReviewCreationDto {
	@IsString({ message: 'Must be a string' })
	@Length(4, 20, { message: 'Title must be from 4 to 20 symbols' })
	title: string

	@IsString({ message: 'Must be a string' })
	description: string

	@IsNumber({}, { message: 'Must be an Integer' })
	grade: number
}
