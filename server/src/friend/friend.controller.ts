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

	@Get('/delete/:id')
	async deleteFriend(@Param('id') id: number) {
		return this.friendService.deleteFriend(id)
	}

	@Get('/sended/:id')
	async getSendedRequests(@Param('id') id: number) {
		return this.friendService.getSendedRequests(id)
	}

	@Get('/received/:id')
	async getReceivedRequests(@Param('id') id: number) {
		return this.friendService.getReceivedRequests(id)
	}

	@Get('/list/:id')
	async getFriends(@Param('id') id: number) {
		return this.friendService.getFriends(id)
	}
}
