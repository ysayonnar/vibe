import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.model'
import { UserCreationDto } from './dto/user-creation.dto'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { Role } from 'src/roles/roles.model'
import { GiveRoleDto } from './dto/giveRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { EditBioDto } from './dto/editBio.dto'
import { EditTguserDto } from './dto/editTguser.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService
	) {}

	async checkEmailUsername(dto: UserCreationDto) {
		const candidateByEmail = await this.userRepository.findOne({
			where: { email: dto.email },
		})
		const candidateByUsername = await this.userRepository.findOne({
			where: { username: dto.username },
		})
		if (candidateByEmail || candidateByUsername) {
			throw new HttpException(
				'User with such email or username already exists',
				HttpStatus.BAD_REQUEST
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
			throw new HttpException('No user with such id', HttpStatus.NOT_FOUND)
		}
		return user
	}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findOne({
			where: { username },
			include: { all: true },
		})
		if (!user) {
			throw new HttpException(
				'No user with such username',
				HttpStatus.NOT_FOUND
			)
		}
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true },
		})
		if (!user) {
			throw new HttpException('No user with such email', HttpStatus.NOT_FOUND)
		}
		return user
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

	async giveRole(dto: GiveRoleDto) {
		const user: User = await this.getUserById(dto.userId)
		const role = await this.roleService.getRoleByName(dto.roleName)
		await user.$add('role', role.id)
		return user
	}

	async removeRole(dto: GiveRoleDto) {
		const user: User = await this.getUserById(dto.userId)
		const role = await this.roleService.getRoleByName(dto.roleName)
		await user.$remove('role', role.id)
		return user
	}

	async banUser(dto: BanUserDto) {
		const user: User = await this.getUserById(dto.userId)
		if (user.isBanned === true) {
			throw new HttpException('User already banned', HttpStatus.BAD_REQUEST)
		}
		user.isBanned = true
		user.banReason = dto.banReason
		await user.save()
		return user
	}

	async unbanUser(id: number) {
		const user: User = await this.getUserById(id)
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
		// const user: User = await this.getUserById(req.user.id)
		// user.bio = dto.bio
		// await user.save()
		// return user

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
			throw new HttpException(
				'User with such telegram already exists',
				HttpStatus.BAD_REQUEST
			)
		}
		const user: User = await this.getUserById(jwtUser.id).then(user => {
			user.telegram_username = dto.telegram_username
			user.save()
			return user
		})
		return user
	}
}
