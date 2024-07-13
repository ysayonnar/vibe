import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Friend } from './friend.model'
import { FriendRequest } from './friend_request.model'
import { RequestDto } from './dto/request-dto'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/user.model'

@Injectable()
export class FriendService {
	constructor(
		@InjectModel(Friend) private friendRepository: typeof Friend,
		@InjectModel(FriendRequest)
		private friendRequestRepositoty: typeof FriendRequest,
		@InjectModel(User) private userRepository: typeof User,
		private userService: UserService
	) {}

	async sendFriendRequest(dto: RequestDto) {
		const sender = await this.userService.getUserById(dto.senderId)
		const recipient = await this.userService.getUserById(dto.recipientId)
		const request = await this.friendRequestRepositoty.create(dto)
		return request
	}

	async acceptFriendRequest(id: number) {
		const request: FriendRequest =
			await this.friendRequestRepositoty.findByPk(id)
		if (!request) {
			throw new HttpException('No request with such id', HttpStatus.NOT_FOUND)
		}

		const sender = await this.userService.getUserById(request.senderId)
		const recipiend = await this.userService.getUserById(request.recipientId)

		const friend_relation1 = await this.friendRepository.create({
			userId: request.senderId,
			friendId: request.recipientId,
		})

		const friend_relation2 = await this.friendRepository.create({
			userId: request.recipientId,
			friendId: request.senderId,
		})

		await request.destroy()
		return { msg: 'friends created' }
	}

	async declineFriendRequest(id: number) {
		const declined = await this.friendRequestRepositoty.destroy({
			where: { id },
		})
		if (declined == 1) {
			return { msg: 'declined' }
		}
		if (declined == 0) {
			throw new HttpException('No request with such id', HttpStatus.NOT_FOUND)
		}
	}
}
