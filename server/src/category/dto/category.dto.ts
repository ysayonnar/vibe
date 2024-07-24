import { IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Must be a string' })
	name: string

	@IsString({ message: 'Must be a string' })
	description: string
}
