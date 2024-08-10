import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Friend } from './friend.model'
import { FriendRequest } from './friend_request.model'
import { RequestDto } from './dto/request-dto'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/user.model'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { NotBelongsException } from 'src/exceptions/not-belongs.exception'
import { ServerErrorException } from 'src/exceptions/server-error.exception'

@Injectable()
export class FriendService {
	constructor(
		@InjectModel(Friend) private friendRepository: typeof Friend,
		@InjectModel(FriendRequest)
		private friendRequestRepositoty: typeof FriendRequest,
		@InjectModel(User) private userRepository: typeof User,
		private userService: UserService
	) {}

	async sendFriendRequest(dto: RequestDto, user) {
		const candidate = await this.friendRepository.findOne({
			where: { friendId: dto.recipientId, userId: user.id },
		})
		if (candidate) {
			throw new HttpException('Already friends', HttpStatus.BAD_REQUEST)
		}
		//это для проверки
		const sender = await this.userService.getUserById(user.id)
		const recipient = await this.userService.getUserById(dto.recipientId)

		const requestPayload = { ...dto, senderId: user.id }
		const request = await this.friendRequestRepositoty.create(requestPayload)
		return request
	}

	async acceptFriendRequest(id: number, user) {
		const request: FriendRequest =
			await this.friendRequestRepositoty.findByPk(id)
		if (!request) {
			throw new NotFoundException('Friend Request')
		}

		//для проверки
		const sender = await this.userService.getUserById(request.senderId)
		const recipient = await this.userService.getUserById(request.recipientId)

		if (recipient.id !== user.id) {
			throw new NotBelongsException('Friend Request')
		}

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

	async declineFriendRequest(id: number, user) {
		const request = await this.friendRequestRepositoty.findByPk(id)
		if (!request) {
			throw new NotFoundException('Friend Request')
		}
		if (request.recipientId !== user.id) {
			throw new NotBelongsException('Friend Request')
		}
		try {
			await request.destroy()
		} catch (e) {
			throw new ServerErrorException()
		}
		return { msg: 'declined' }
	}

	async deleteFriend(id: number, user) {
		try {
			const deletedFriend = await this.friendRepository.destroy({
				where: { friendId: id, userId: user.id },
			})
			if (deletedFriend === 1) {
				return { msg: 'friend deleted' }
			}
			if (deletedFriend === 0) {
				throw new NotFoundException('Friend')
			}
		} catch (e) {
			throw new HttpException('something went wrong', HttpStatus.BAD_GATEWAY)
		}
	}

	async getSendedRequests(user) {
		const foundedUser: User = await this.userRepository.findOne({
			where: { id: user.id },
			include: { all: true },
		})
		if (foundedUser.sended_friend_requests.length === 0) {
			throw new NotFoundException('Sended friend request')
		}
		return foundedUser.sended_friend_requests
	}

	async getReceivedRequests(user) {
		const foundedUser: User = await this.userRepository.findOne({
			where: { id: user.id },
			include: { all: true },
		})
		if (foundedUser.friend_requests.length === 0) {
			throw new NotFoundException('Friend request')
		}
		return foundedUser.friend_requests
	}

	async getFriends(user) {
		const foundedUser: User = await this.userRepository.findOne({
			where: { id: user.id },
			include: { all: true },
		})
		const friends = await this.userRepository.findAll({
			where: { id: foundedUser.friends.map(friend => friend.friendId) },
		})
		return friends
	}
}
