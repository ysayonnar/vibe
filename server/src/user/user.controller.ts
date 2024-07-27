import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common'
import { UserService } from './user.service'
import { GiveRoleDto } from './dto/giveRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { EditBioDto } from './dto/editBio.dto'
import { EditTguserDto } from './dto/editTguser.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { ValidationPipe } from 'src/pipes/validation.pipe'

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

	@UsePipes(ValidationPipe)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/give_role/:id')
	async giveRole(@Body() dto: GiveRoleDto, @Param('id') id: number) {
		return this.userService.giveRole(id, dto)
	}

	@UsePipes(ValidationPipe)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/remove_role/:id')
	async removeRole(@Body() dto: GiveRoleDto, @Param('id') id: number) {
		return this.userService.removeRole(id, dto)
	}

	@UsePipes(ValidationPipe)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban/:id')
	async banUser(@Param('id') id: number, @Body() dto: BanUserDto) {
		return this.userService.banUser(id, dto)
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/unban/:id')
	async unbanUser(@Param('id') id: number) {
		return this.userService.unbanUser(id)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Post('/bio')
	async editBio(@Body() dto: EditBioDto, @Req() req) {
		return this.userService.edtiBio(dto, req.user)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Post('/tg')
	async editTguser(@Body() dto: EditTguserDto, @Req() req) {
		return this.userService.editTguser(dto, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	@Put('/avatar')
	async changeAvatar(@Req() req, @UploadedFile() image) {
		return this.userService.changeAvatar(image, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/avatar')
	async deleteAvatar(@Req() req) {
		return this.userService.deleteAvatar(req.user)
	}
}
