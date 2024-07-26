import { HttpException, HttpStatus } from '@nestjs/common'

export class AlreadyExistsException extends HttpException {
	constructor(response) {
		super(response, HttpStatus.BAD_REQUEST)
	}
}
