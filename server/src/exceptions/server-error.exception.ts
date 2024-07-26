import { HttpException, HttpStatus } from '@nestjs/common'

export class ServerErrorException extends HttpException {
	constructor() {
		super('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
	}
}
