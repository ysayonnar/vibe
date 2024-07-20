import { Module } from '@nestjs/common'
import { PlaceModule } from './place/place.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { Place } from './place/place.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { UserModule } from './user/user.module'
import { User } from './user/user.model'
import { UserRoles } from './roles/user-roles.model'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { FriendModule } from './friend/friend.module'
import { Friend } from './friend/friend.model'
import { FriendRequest } from './friend/friend_request.model'
import { ReviewModule } from './review/review.module'
import { Review } from './review/review.model'

@Module({
	imports: [
		PlaceModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			models: [Place, Role, User, UserRoles, Friend, FriendRequest, Review],
			autoLoadModels: true,
		}),
		RolesModule,
		UserModule,
		AuthModule,
		FriendModule,
		ReviewModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class AppModule {}
