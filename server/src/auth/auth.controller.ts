import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserCreationDto } from 'src/user/dto/user-creation.dto'
import { loginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

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
