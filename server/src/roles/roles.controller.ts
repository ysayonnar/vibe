import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('roles')
export class RolesController {
	constructor(readonly roleService: RolesService) {}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async getRoles() {
		return this.roleService.getRoles()
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/:name')
	async getRoleByName(@Param('name') name: string) {
		return this.roleService.getRoleByName(name)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/create')
	async createRole(@Body() roleDto: CreateRoleDto) {
		return this.roleService.createRole(roleDto)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete('/delete/:name')
	async deleteRoleByName(@Param('name') name: string) {
		return this.roleService.deleteRoleByName(name)
	}
}
