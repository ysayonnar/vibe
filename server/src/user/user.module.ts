import { forwardRef, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { Friend } from 'src/friend/friend.model'
import { FriendRequest } from 'src/friend/friend_request.model'
import { AuthModule } from 'src/auth/auth.module'
import { FilesModule } from 'src/files/files.module'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles, Friend, FriendRequest]),
		forwardRef(() => RolesModule),
		forwardRef(() => AuthModule),
		FilesModule,
	],
	exports: [UserService],
})
export class UserModule {}
