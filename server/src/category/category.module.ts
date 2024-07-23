import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { AuthModule } from 'src/auth/auth.module'
import { Category } from './category.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [SequelizeModule.forFeature([Category])],
})
export class CategoryModule {}
