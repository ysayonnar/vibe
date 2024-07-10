import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserCreationDto } from './dto/user-creation.dto'

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
}
