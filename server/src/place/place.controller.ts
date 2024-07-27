import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common'
import { PlaceService } from './place.service'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PlaceCreationDto } from './dto/place.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@Controller('place')
export class PlaceController {
	constructor(readonly placeService: PlaceService) {}

	@Get()
	async getAllPlaces() {
		return this.placeService.getAllPlaces()
	}

	@Get('/byid/:id')
	async getPlaceById(@Param('id') id: number) {
		return this.placeService.getPlaceById(id)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	@Post('/create')
	async createPlace(
		@Body() dto: PlaceCreationDto,
		@Req() req,
		@UploadedFile() image
	) {
		return this.placeService.createPlace(dto, req.user, image)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Put('/update/:id')
	async changePlace(
		@Body() dto: PlaceCreationDto,
		@Param('id') id: number,
		@Req() req
	) {
		return this.placeService.updatePlace(dto, id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	@Put('/photo/:id')
	async changePhoto(
		@Param('id') id: number,
		@Req() req,
		@UploadedFile() image
	) {
		return this.placeService.changePhoto(req.user, image, id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/photo/:id')
	async deletePhoto(@Param('id') id: number, @Req() req) {
		return this.placeService.deletePhoto(id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/delete/:id')
	async deletePlace(@Param('id') id: number, @Req() req) {
		return this.placeService.delete(id, req.user)
	}

	@Get('/find/:searchQuery')
	async findPlaceByName(@Param('searchQuery') search: string) {
		return this.placeService.findPlaceByName(search)
	}

	@Get('/filter')
	async filterByCategories(@Body() categoriesId: number[]) {
		return this.placeService.filterByCategories(categoriesId)
	}

	@Get('/filterByRating/:minimal')
	async filterByRating(@Param('minimal') minimal: number) {
		return this.placeService.filterByRating(minimal)
	}

	@UseGuards(JwtAuthGuard)
	@Put('/setCategories/:id')
	async setCategories(
		@Param('id') id: number,
		@Body() categoriesId: number[],
		@Req() req
	) {
		console.log('adad')
		return this.placeService.setCategories(id, categoriesId, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/favourite/add/:id')
	async addToFavourite(@Param('id') id: number, @Req() req) {
		return this.placeService.addToFavourite(id, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/favourite/delete/:id')
	async deleteFromFavourite(@Param('id') id: number, @Req() req) {
		return this.placeService.deleteFromFavourite(id, req.user)
	}
}
