import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/category.dto'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('category')
export class CategoryController {
	constructor(readonly categoryService: CategoryService) {}

	@Get()
	async getAllCategories() {
		return this.categoryService.getAllCategories()
	}

	@Get('/:id')
	async getCategoryById(@Param('id') id: number) {
		return this.categoryService.getCategoryById(id)
	}

	@Get('/byname/:name')
	async getCategoryByName(@Param('name') name: string) {
		return this.categoryService.getCategoryByName(name)
	}

	// @Roles('ADMIN')
	// @UseGuards(RolesGuard)
	@Post('/create')
	async createCategory(@Body() dto: CreateCategoryDto) {
		return this.categoryService.createCategory(dto)
	}

	// @Roles('ADMIN')
	// @UseGuards(RolesGuard)
	@Delete('/delete/:id')
	async deleteCategory(@Param('id') id: number) {
		return this.categoryService.deleteCategory(id)
	}
}
