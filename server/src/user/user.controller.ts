import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserCreationDto } from './dto/user-creation.dto'
import { GiveRoleDto } from './dto/giveRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { EditBioDto } from './dto/editBio.dto'
import { EditTguserDto } from './dto/editTguser.dto'

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

	@Post('/create')
	async createUser(@Body() dto: UserCreationDto) {
		return this.userService.createUser(dto)
	}

	@Post('/give_role')
	async giveRole(@Body() dto: GiveRoleDto) {
		return this.userService.giveRole(dto)
	}

	@Post('/remove_role')
	async removeRole(@Body() dto: GiveRoleDto) {
		return this.userService.removeRole(dto)
	}

	@Post('/ban')
	async banUser(@Body() dto: BanUserDto) {
		return this.userService.banUser(dto)
	}

	@Get('/unban/:id')
	async unbanUser(@Param('id') id: number) {
		return this.userService.unbanUser(id)
	}

	@Post('/bio')
	async editBio(@Body() dto: EditBioDto) {
		return this.userService.edtiBio(dto)
	}

	@Post('/tg')
	async editTguser(@Body() dto: EditTguserDto) {
		return this.userService.editTguser(dto)
	}
}
