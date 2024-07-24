import { Module } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceController } from './place.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Place } from './place.model'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import { FilesModule } from 'src/files/files.module'
import { CategoryModule } from 'src/category/category.module'
import { Category } from 'src/category/category.model'

@Module({
	providers: [PlaceService],
	controllers: [PlaceController],
	imports: [
		SequelizeModule.forFeature([Place]),
		AuthModule,
		UserModule,
		FilesModule,
		CategoryModule,
	],
	exports: [PlaceService],
})
export class PlaceModule {}
