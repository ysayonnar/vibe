import { IsNumber, IsString, Length } from 'class-validator'

export class PlaceCreationDto {
	@IsNumber({}, { message: 'Must be an Integer' })
	longtitude: number

	@IsNumber({}, { message: 'Must be an Integer' })
	width: number

	@IsString({ message: 'Must be a string' })
	@Length(4, 20, { message: 'Name should be from 4 to 20 symbols' })
	name: string

	@IsString({ message: 'Must be a string' })
	description: string
}
