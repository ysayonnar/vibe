import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './roles.model'

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [SequelizeModule.forFeature([Role])],
})
export class RolesModule {}
