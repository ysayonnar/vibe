import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'

@Controller('roles')
export class RolesController {
	constructor(readonly roleService: RolesService) {}

	@Get()
	async getRoles() {
		return this.roleService.getRoles()
	}

	@Get('/:name')
	async getRoleByName(@Param('name') name: string) {
		return this.roleService.getRoleByName(name)
	}

	@Post('/create')
	async createRole(@Body() roleDto: CreateRoleDto) {
		return this.roleService.createRole(roleDto)
	}

	@Delete('/delete/:name')
	async deleteRoleByName(@Param('name') name: string) {
		return this.roleService.deleteRoleByName(name)
	}
}
