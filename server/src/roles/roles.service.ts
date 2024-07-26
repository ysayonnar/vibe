import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'
import { CreateRoleDto } from './dto/create-role.dto'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { AlreadyExistsException } from 'src/exceptions/already-exists.exception'

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	async getRoles() {
		const roles = await this.roleRepository.findAll()
		return roles
	}

	async getRoleByName(roleName: string) {
		const role = await this.roleRepository.findOne({
			where: { name: roleName.toUpperCase() },
		})
		if (!role) {
			throw new NotFoundException('Role')
		}
		return role
	}

	async createRole(dto: CreateRoleDto) {
		const check = await this.roleRepository.findOne({
			where: { name: dto.name.toUpperCase() },
		})
		if (check) {
			throw new AlreadyExistsException('Role')
		}
		const role = await this.roleRepository.create({
			...dto,
			name: dto.name.toUpperCase(),
		})
		return role
	}

	async deleteRoleByName(roleName: string) {
		const deletedRole = await this.roleRepository.destroy({
			where: { name: roleName.toUpperCase() },
		})
		if (deletedRole === 1) {
			return { msg: 'successfully deleted' }
		} else if (deletedRole === 0) {
			throw new NotFoundException('Role')
		}
	}
}
