import { IsNumber } from 'class-validator'

export class RequestDto {
	@IsNumber({}, { message: 'Must be an Integer' })
	recipientId: number
}
