import { Module } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceController } from './place.controller'
import { Sequelize } from 'sequelize'
import { SequelizeModule } from '@nestjs/sequelize'
import { Place } from './place.model'

@Module({
	providers: [PlaceService],
	controllers: [PlaceController],
	imports: [SequelizeModule.forFeature([Place])],
})
export class PlaceModule {}
