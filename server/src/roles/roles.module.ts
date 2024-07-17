import { forwardRef, Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './roles.model'
import { User } from 'src/user/user.model'
import { UserRoles } from './user-roles.model'
import { AuthService } from 'src/auth/auth.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [
		SequelizeModule.forFeature([Role, User, UserRoles]),
		forwardRef(() => AuthModule),
	],
	exports: [RolesService],
})
export class RolesModule {}
