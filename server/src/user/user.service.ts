import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.model'
import { UserCreationDto } from './dto/user-creation.dto'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { Role } from 'src/roles/roles.model'

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
			include: { model: Role, attributes: ['id', 'name', 'description'] },
		})
		return users
	}

	async getUserById(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			include: { model: Role, attributes: ['id', 'name', 'description'] },
		})
		if (!user) {
			throw new HttpException('No user with such id', HttpStatus.NOT_FOUND)
		}
		return user
	}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findOne({
			where: { username },
			include: { model: Role, attributes: ['id', 'name', 'description'] },
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
			include: { model: Role, attributes: ['id', 'name', 'description'] },
		})
		if (!user) {
			throw new HttpException('No user with such email', HttpStatus.NOT_FOUND)
		}
		return user
	}

	async createUser(dto: UserCreationDto) {
		await this.checkEmailUsername(dto)
		const role = await this.roleService.getRoleByName('USER')
		const user = await this.userRepository.create(dto)
		await user.$set('roles', [role.id])
		user.roles = [role]
		await user.save()
		return user
	}

	async addRoleAdmin(id) {
		const user = await this.userRepository.findOne({ where: { id } })
		if (!user) {
			throw new HttpException('No user with such id', HttpStatus.NOT_FOUND)
		}
		const adminRole = await this.roleService.getRoleByName('ADMIN')
		await user.$set('roles', [adminRole.id])
		user.roles = [adminRole]
		await user.save()
		return user
	}
}
