import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.model'
import { UserCreationDto } from './dto/user-creation.dto'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { GiveRoleDto } from './dto/giveRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { EditBioDto } from './dto/editBio.dto'
import { EditTguserDto } from './dto/editTguser.dto'
import { FilesService } from 'src/files/files.service'
import { AlreadyExistsException } from 'src/exceptions/already-exists.exception'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { FriendRequest } from 'src/friend/friend_request.model'
import { Friend } from 'src/friend/friend.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		readonly roleService: RolesService,
		readonly filesService: FilesService
	) {}

	async checkEmailUsername(dto: UserCreationDto) {
		const candidateByEmail = await this.userRepository.findOne({
			where: { email: dto.email },
		})
		const candidateByUsername = await this.userRepository.findOne({
			where: { username: dto.username },
		})
		if (candidateByEmail || candidateByUsername) {
			throw new AlreadyExistsException(
				'User with such email or username already exists'
			)
		}
		return true
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({
			include: { all: true },
		})
		return users
	}

	async getUserById(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			include: { all: true },
		})
		if (!user) {
			throw new NotFoundException('User')
		}
		return user
	}

	async getUsersByIds(ids: number[]) {
		const users: User[] = await this.userRepository.findAll({
			where: {
				id: ids,
			},
			include: { all: true },
		})
		if (users.length === 0) {
			throw new NotFoundException('Users')
		}
		return users
	}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findOne({
			where: { username },
			include: { all: true },
		})
		if (!user) {
			throw new NotFoundException('user')
		}
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true },
		})
		if (!user) {
			throw new NotFoundException('user')
		}
		return user
	}

	async searchUsersByUsername(username: string, user) {
		const users: User[] = await this.getAllUsers()
		let foundedUsers = []
		for (let i = 0; i < users.length; i++) {
			const user: User = users[i]
			const check = user.username
				.toLowerCase()
				.startsWith(username.toLowerCase())
			if (check) {
				foundedUsers.push(user)
			}
		}

		foundedUsers = foundedUsers.filter((fUser: User) => fUser.id !== user.id)
		foundedUsers = foundedUsers.filter(
			(fUser: User) =>
				!fUser.friend_requests.some(
					(request: FriendRequest) => request.senderId == user.id
				)
		)

		foundedUsers ==
			foundedUsers.filter(
				(fUser: User) =>
					!fUser.sended_friend_requests.some(
						(request: FriendRequest) => request.recipientId == user.id
					)
			)

		foundedUsers = foundedUsers.filter(
			(fUser: User) =>
				!fUser.friends.some((friend: Friend) => friend.friendId == user.id)
		)

		if (foundedUsers.length === 0) {
			throw new HttpException('Nothing found', HttpStatus.NOT_FOUND)
		} else {
			return foundedUsers
		}
	}

	async createUser(dto: UserCreationDto) {
		await this.checkEmailUsername(dto)
		const role = await this.roleService.getRoleByName('USER')
		const createdUser = await this.userRepository
			.create(dto)
			.then(async user => {
				await user.$set('roles', [role.id])
				user.roles = [role]
				return user
			})
			.then(user => user.save())
		return createdUser
	}

	async giveRole(userId: number, dto: GiveRoleDto) {
		const user: User = await this.getUserById(userId)
		const role = await this.roleService.getRoleByName(dto.roleName)
		await user.$add('role', role.id)
		return user
	}

	async removeRole(userId, dto: GiveRoleDto) {
		const user: User = await this.getUserById(userId)
		const role = await this.roleService.getRoleByName(dto.roleName)
		await user.$remove('role', role.id)
		return user
	}

	async banUser(userId, dto: BanUserDto) {
		const user: User = await this.getUserById(userId)
		if (user.isBanned === true) {
			throw new HttpException('User already banned', HttpStatus.BAD_REQUEST)
		}
		user.isBanned = true
		user.banReason = dto.banReason
		await user.save()
		return user
	}

	async unbanUser(userId: number) {
		const user: User = await this.getUserById(userId)
		if (user.isBanned === false) {
			throw new HttpException(
				'User you want to unban is not banned',
				HttpStatus.BAD_REQUEST
			)
		}
		user.isBanned = false
		user.banReason = null
		await user.save()
		return user
	}

	async edtiBio(dto: EditBioDto, jwtUser) {
		const user: User = await this.getUserById(jwtUser.id).then(user => {
			user.bio = dto.bio
			user.save()
			return user
		})
		return user
	}

	async editTguser(dto: EditTguserDto, jwtUser) {
		if (dto.telegram_username[0] !== '@') {
			throw new HttpException(
				'Incorrect telegram username',
				HttpStatus.BAD_REQUEST
			)
		}
		const candidate = await this.userRepository.findOne({
			where: { telegram_username: dto.telegram_username },
		})
		if (candidate) {
			throw new AlreadyExistsException('User with such telegram already exists')
		}
		const user: User = await this.getUserById(jwtUser.id).then(user => {
			user.telegram_username = dto.telegram_username
			user.save()
			return user
		})
		return user
	}

	async changeAvatar(file, jwtUser) {
		const user: User = await this.getUserById(jwtUser.id)
		if (user.avatar.length == 0) {
			const fileName = await this.filesService.createFile(file)
			await user.update({ ...user, avatar: fileName })
		} else {
			await this.filesService.rewriteFile(file, user.avatar)
		}
		return user
	}

	async deleteAvatar(jwtUser) {
		const user: User = await this.getUserById(jwtUser.id)
		if (user.avatar.length == 0) {
			throw new HttpException('No avatar for this user', HttpStatus.BAD_REQUEST)
		}
		await this.filesService.deletePhoto(user.avatar)
		await user.update({ ...user, avatar: '' })
		return { msg: 'deleted' }
	}
}
