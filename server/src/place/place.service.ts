import { Injectable } from '@nestjs/common'

@Injectable()
export class PlaceService {
	async getHello() {
		return { msg: 'hello' }
	}
}
