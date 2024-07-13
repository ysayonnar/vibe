import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { Friend } from 'src/friend/friend.model'
import { FriendRequest } from 'src/friend/friend_request.model'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles, Friend, FriendRequest]),
		RolesModule,
	],
	exports: [UserService],
})
export class UserModule {}
