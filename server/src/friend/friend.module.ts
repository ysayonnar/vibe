import { Module } from '@nestjs/common'
import { FriendController } from './friend.controller'
import { FriendService } from './friend.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module'
import { Friend } from './friend.model'
import { FriendRequest } from './friend_request.model'

@Module({
	controllers: [FriendController],
	providers: [FriendService],
	imports: [
		SequelizeModule.forFeature([User, Friend, FriendRequest]),
		UserModule,
	],
})
export class FriendModule {}
