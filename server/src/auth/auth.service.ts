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

	validateEmail(email: string) {
		const atIndex: number = email.indexOf('@')
		const dotIndex: number = email.lastIndexOf('.')

		return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1
	}

	validateUsername(username: string) {
		if (username.length > 3 && username.length < 20) {
			return true
		}
		return false
	}

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
		throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
	}

	async registration(dto: UserCreationDto) {
		if (!this.validateEmail(dto.email)) {
			throw new HttpException('Email is incorrect', HttpStatus.BAD_REQUEST)
		}
		if (!this.validateUsername(dto.username)) {
			throw new HttpException(
				'Username must be from 3 to 20 symbols',
				HttpStatus.BAD_REQUEST
			)
		}
		const hash = await bcrypt.hash(dto.password_hash, 5)
		const user = await this.userService.createUser({
			...dto,
			password_hash: hash,
		})
		return this.generateToken(user)
	}

	async login(dto: loginDto) {
		if (!this.validateEmail(dto.email)) {
			throw new HttpException('Email is incorrect', HttpStatus.BAD_REQUEST)
		}
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}
}
