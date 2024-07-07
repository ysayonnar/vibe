import { Controller, Get } from '@nestjs/common'
import { PlaceService } from './place.service'

@Controller('place')
export class PlaceController {
	constructor(readonly placeService: PlaceService) {}
}
