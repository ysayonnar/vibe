import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { FriendService } from './friend.service'
import { RequestDto } from './dto/request-dto'

@Controller('friend')
export class FriendController {
	constructor(private friendService: FriendService) {}

	@Post('/send')
	async sendFriendRequest(@Body() dto: RequestDto) {
		return this.friendService.sendFriendRequest(dto)
	}

	@Get('/accept/:id')
	async acceptFriendRequest(@Param('id') id: number) {
		return this.friendService.acceptFriendRequest(id)
	}

	@Get('/decline/:id') //id - реквеста
	async declineFriendRequest(@Param('id') id: number) {
		return this.friendService.declineFriendRequest(id)
	}
}
