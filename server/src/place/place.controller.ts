import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common'
import { PlaceService } from './place.service'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PlaceCreationDto } from './dto/place.dto'

@Controller('place')
export class PlaceController {
	constructor(readonly placeService: PlaceService) {}

	@Get()
	async getAllPlaces() {
		return this.placeService.getAllPlaces()
	}

	@Get('/:id')
	async getPlaceById(@Param('id') id: number) {
		return this.placeService.getPlaceById(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async createPlace(@Body() dto: PlaceCreationDto, @Req() req) {
		return this.placeService.createPlace(dto, req.user)
	}

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
	@Delete('/delete/:id')
	async deletePlace(@Param('id') id: number, @Req() req) {
		return this.placeService.delete(id, req.user)
	}

	@Get('/find/:searchQuery')
	async findPlaceByName(@Param('searchQuery') search: string) {
		return this.placeService.findPlaceByName(search)
	}
}
