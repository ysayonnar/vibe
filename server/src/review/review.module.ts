import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Review } from './review.model'
import { AuthModule } from 'src/auth/auth.module'
import { PlaceModule } from 'src/place/place.module'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService],
	imports: [SequelizeModule.forFeature([Review]), AuthModule, PlaceModule],
})
export class ReviewModule {}
