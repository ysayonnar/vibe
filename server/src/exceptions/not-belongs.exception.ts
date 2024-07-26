import { HttpException, HttpStatus } from '@nestjs/common'

export class NotBelongsException extends HttpException {
	constructor(object: string) {
		super(`This ${object} does not belong to this user`, HttpStatus.FORBIDDEN)
	}
}
