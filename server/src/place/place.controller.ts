import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceCreation } from './place.model'

@Controller('place')
export class PlaceController {
	constructor(readonly placeService: PlaceService) {}

	@Get()
	async getAllPlaces() {}

	@Get('/:id')
	async getPlaceById(@Param('id') id: number) {}

	@Post('/create')
	async createPlace(@Body() placeDto: PlaceCreation) {}

	@Put('/update')
	async changePlace(@Body() placeDto: PlaceCreation) {}

	@Delete('/delete/:id')
	async deletePlace(@Param('id') id: number) {}
}
