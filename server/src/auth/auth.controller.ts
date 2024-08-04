import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserCreationDto } from 'src/user/dto/user-creation.dto'
import { loginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/info')
	async getInfoByJwt(@Req() req) {
		return this.authService.getInfoByJwt(req.user)
	}

	@UsePipes(ValidationPipe)
	@Post('/registration')
	async registration(@Body() dto: UserCreationDto) {
		return this.authService.registration(dto)
	}

	@UsePipes(ValidationPipe)
	@Post('/login')
	async login(@Body() dto: loginDto) {
		return this.authService.login(dto)
	}
}
