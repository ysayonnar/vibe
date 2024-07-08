import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'
import { CreateRoleDto } from './dto/create-role.dto'

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
		if (role) {
			return role
		}
		throw new HttpException('No role with such name', HttpStatus.NOT_FOUND)
	}

	async createRole(dto: CreateRoleDto) {
		const check = await this.roleRepository.findOne({
			where: { name: dto.name.toUpperCase() },
		})
		if (check) {
			throw new HttpException('Such role alredy exists', HttpStatus.BAD_REQUEST)
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
			throw new HttpException('No role with such name', HttpStatus.NOT_FOUND)
		}
	}
}
