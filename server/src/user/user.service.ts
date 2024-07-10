import { Injectable } from '@nestjs/common'
import { User } from './user.model'
import { UserCreationDto } from './dto/user-creation.dto'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async getAllUsers() {}

	async getUserById(id: number) {}

	async getUserByUsername(username: string) {}

	async createUser(dto: UserCreationDto) {}
}
