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

	async sendFriendRequest(dto: RequestDto, req) {
		const candidate = await this.friendRepository.findOne({
			where: { friendId: dto.recipientId, userId: req.user.id },
		})
		if (candidate) {
			throw new HttpException('Already friends', HttpStatus.BAD_REQUEST)
		}
		//это для проверки
		const sender = await this.userService.getUserById(req.user.id)
		const recipient = await this.userService.getUserById(dto.recipientId)

		const requstPayload = { ...dto, senderId: req.user.id }
		const request = await this.friendRequestRepositoty.create(requstPayload)
		return request
	}

	async acceptFriendRequest(id: number, req) {
		const request: FriendRequest =
			await this.friendRequestRepositoty.findByPk(id)
		if (!request) {
			throw new HttpException('No request with such id', HttpStatus.NOT_FOUND)
		}

		//для проверки
		const sender = await this.userService.getUserById(request.senderId)
		const recipient = await this.userService.getUserById(request.recipientId)

		if (recipient.id !== req.user.id) {
			throw new HttpException(
				'This friend request is not for this user',
				HttpStatus.BAD_REQUEST
			)
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

	async declineFriendRequest(id: number, req) {
		const request = await this.friendRequestRepositoty.findByPk(id)
		if (!request) {
			throw new HttpException('No request with such id', HttpStatus.NOT_FOUND)
		}
		if (request.recipientId !== req.user.id) {
			throw new HttpException(
				'This friend request is not for this user',
				HttpStatus.BAD_REQUEST
			)
		}
		try {
			await request.destroy()
		} catch (e) {
			throw new HttpException('Not declined', HttpStatus.BAD_REQUEST)
		}
		return { msg: 'declined' }
	}

	async deleteFriend(id: number, req) {
		try {
			const deletedFriend = await this.friendRepository.destroy({
				where: { friendId: id, userId: req.user.id },
			})
			if (deletedFriend === 1) {
				return { msg: 'friend deleted' }
			}
			if (deletedFriend === 0) {
				throw new HttpException('No friend with such id', HttpStatus.NOT_FOUND)
			}
		} catch (e) {
			throw new HttpException('something went wrong', HttpStatus.BAD_GATEWAY)
		}
	}

	async getSendedRequests(req) {
		const user: User = await this.userRepository.findOne({
			where: { id: req.user.id },
			include: { all: true },
		})
		return user.sended_friend_requests
	}

	async getReceivedRequests(req) {
		const user: User = await this.userRepository.findOne({
			where: { id: req.user.id },
			include: { all: true },
		})
		return user.friend_requests
	}

	async getFriends(req) {
		const user: User = await this.userRepository.findOne({
			where: { id: req.user.id },
			include: { all: true },
		})
		const friends = await this.userRepository.findAll({
			where: { id: user.friends.map(friend => friend.friendId) },
		})
		return friends
	}
}
