import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserCreationDto } from 'src/user/dto/user-creation.dto'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/user.model'
import { loginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService
	) {}

	private async generateToken(user: User) {
		const payload = {
			id: user.id,
			email: user.email,
			username: user.username,
			roles: user.roles,
		}
		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(dto: loginDto) {
		const user = await this.userService.getUserByEmail(dto.email)
		const password_equals = await bcrypt.compare(
			dto.password,
			user.password_hash
		)
		if (password_equals) {
			return user
		}
		throw new HttpException('Password is not valid', HttpStatus.FORBIDDEN)
	}

	async registration(dto: UserCreationDto) {
		const hash = await bcrypt.hash(dto.password_hash, 5)
		const user = await this.userService.createUser({
			...dto,
			password_hash: hash,
		})
		return this.generateToken(user)
	}

	async login(dto: loginDto) {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	async getInfoByJwt(user) {
		const info = await this.userService.getUserById(user.id)
		return info
	}
}
