import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Place } from './place.model'

@Injectable()
export class PlaceService {
	constructor(@InjectModel(Place) private PlaceRepository: typeof Place) {}
}
