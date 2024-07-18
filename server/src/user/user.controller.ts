import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { GiveRoleDto } from './dto/giveRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { EditBioDto } from './dto/editBio.dto'
import { EditTguserDto } from './dto/editTguser.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@Get()
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get('/id/:id')
	async getUserById(@Param('id') id: number) {
		return this.userService.getUserById(id)
	}

	@Get('/username/:username')
	async getUserByUsername(@Param('username') username: string) {
		return this.userService.getUserByUsername(username)
	}

	@Get('/email/:email')
	async getUserByEmail(@Param('email') email: string) {
		return this.userService.getUserByEmail(email)
	}

	// @Post('/create')
	// async createUser(@Body() dto: UserCreationDto) {
	// 	return this.userService.createUser(dto)
	// }

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/give_role')
	async giveRole(@Body() dto: GiveRoleDto) {
		return this.userService.giveRole(dto)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/remove_role')
	async removeRole(@Body() dto: GiveRoleDto) {
		return this.userService.removeRole(dto)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	async banUser(@Body() dto: BanUserDto) {
		return this.userService.banUser(dto)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/unban/:id')
	async unbanUser(@Param('id') id: number) {
		return this.userService.unbanUser(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/bio')
	async editBio(@Body() dto: EditBioDto, @Req() req: Request) {
		return this.userService.edtiBio(dto, req)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/tg')
	async editTguser(@Body() dto: EditTguserDto, @Req() req: Request) {
		return this.userService.editTguser(dto, req)
	}
}
