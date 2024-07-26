import { HttpException, HttpStatus } from '@nestjs/common'

export class NotFoundException extends HttpException {
	constructor(notFoundValue) {
		super(`${notFoundValue} with such value is not found`, HttpStatus.NOT_FOUND)
	}
}
