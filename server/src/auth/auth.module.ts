import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		SequelizeModule.forFeature([User]),
		forwardRef(() => UserModule),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '24h' },
		}),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
