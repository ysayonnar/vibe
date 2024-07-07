import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceCreation } from './place.model'

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

	@Post('/create')
	async createPlace(@Body() placeDto: PlaceCreation) {
		return this.placeService.createPlace(placeDto)
	}

	@Put('/update/:id')
	async changePlace(@Body() placeDto: PlaceCreation, @Param('id') id: number) {
		return this.placeService.updatePlace(placeDto, id)
	}

	@Delete('/delete/:id')
	async deletePlace(@Param('id') id: number) {
		return this.placeService.delete(id)
	}
}
