import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Category } from './category.model'
import { CreateCategoryDto } from './dto/category.dto'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { AlreadyExistsException } from 'src/exceptions/already-exists.exception'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category) private categoryRepository: typeof Category
	) {}

	async getAllCategories() {
		const categories = await this.categoryRepository.findAll({
			include: { all: true },
		})
		return categories
	}

	async getCategoryById(categoryId: number) {
		const category = await this.categoryRepository.findByPk(categoryId, {
			include: { all: true },
		})
		if (!category) {
			throw new NotFoundException('Category')
		}
		return category
	}

	async getCategoryByName(name: string) {
		const category = await this.categoryRepository.findOne({
			where: { name: name.toLowerCase() },
			include: { all: true },
		})
		if (!category) {
			throw new NotFoundException('Category')
		}
		return category
	}

	async createCategory(dto: CreateCategoryDto) {
		const loweredName = dto.name.toLowerCase()
		const candidate = await this.categoryRepository.findOne({
			where: { name: loweredName },
		})
		if (candidate) {
			throw new AlreadyExistsException('Category with such name already exists')
		}
		const category = await this.categoryRepository.create({
			...dto,
			name: loweredName,
		})
		return category
	}

	async deleteCategory(categoryId: number) {
		const category = await this.getCategoryById(categoryId)
		await category.destroy()
		return { msg: 'deleted' }
	}
}
