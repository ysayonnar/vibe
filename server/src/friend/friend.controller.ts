import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { FriendService } from './friend.service'
import { RequestDto } from './dto/request-dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('friend')
export class FriendController {
	constructor(private friendService: FriendService) {}

	@UseGuards(JwtAuthGuard)
	@Post('/send')
	async sendFriendRequest(@Body() dto: RequestDto, @Req() req) {
		return this.friendService.sendFriendRequest(dto, req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/accept/:id') //id - реквеста
	async acceptFriendRequest(@Param('id') id: number, @Req() req) {
		return this.friendService.acceptFriendRequest(id, req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/decline/:id') //id - реквеста
	async declineFriendRequest(@Param('id') id: number, @Req() req) {
		return this.friendService.declineFriendRequest(id, req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/delete/:id') //id - друга
	async deleteFriend(@Param('id') id: number, @Req() req) {
		return this.friendService.deleteFriend(id, req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/sended')
	async getSendedRequests(@Req() req) {
		return this.friendService.getSendedRequests(req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/received')
	async getReceivedRequests(@Req() req) {
		return this.friendService.getReceivedRequests(req)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/list')
	async getFriends(@Req() req) {
		return this.friendService.getFriends(req)
	}
}
