import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { FriendService } from './friend.service'
import { RequestDto } from './dto/request-dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('friend')
export class FriendController {
	constructor(private friendService: FriendService) {}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Post('/send')
	async sendFriendRequest(@Body() dto: RequestDto, @Req() req) {
		return this.friendService.sendFriendRequest(dto, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/accept/:id') //id - реквеста
	async acceptFriendRequest(@Param('id') id: number, @Req() req) {
		return this.friendService.acceptFriendRequest(id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/decline/:id') //id - реквеста
	async declineFriendRequest(@Param('id') id: number, @Req() req) {
		return this.friendService.declineFriendRequest(id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/delete/:id') //id - друга
	async deleteFriend(@Param('id') id: number, @Req() req) {
		return this.friendService.deleteFriend(id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/sended')
	async getSendedRequests(@Req() req) {
		return this.friendService.getSendedRequests(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/received')
	async getReceivedRequests(@Req() req) {
		return this.friendService.getReceivedRequests(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/list')
	async getFriends(@Req() req) {
		return this.friendService.getFriends(req.user)
	}
}
