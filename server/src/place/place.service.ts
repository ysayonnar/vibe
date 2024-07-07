import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Place, PlaceCreation } from './place.model'

@Injectable()
export class PlaceService {
	constructor(@InjectModel(Place) private PlaceRepository: typeof Place) {}

	async getAllPlaces() {
		const places = await this.PlaceRepository.findAll()
		return places
	}

	async getPlaceById(id: number) {
		const place = await this.PlaceRepository.findByPk(id)
		if (place) {
			return place
		}
		throw new HttpException('no place with such id', HttpStatus.NOT_FOUND)
	}

	async createPlace(dto: PlaceCreation) {
		//тут сделать проверку чтобы люди не добавляли одни и те же места(по долготе и ширине)
		const createdPLace = await this.PlaceRepository.create(dto)
		if (createdPLace) {
			return createdPLace
		}
		throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
	}

	async updatePlace(dto, id) {
		const place = await this.PlaceRepository.findByPk(id)
		if (!place) {
			throw new HttpException('no place with such id', HttpStatus.BAD_REQUEST)
		}
		await place.update({ ...place, ...dto })
		await place.save()
		return place
	}

	async delete(id) {
		const deleted = await this.PlaceRepository.destroy({ where: { id } })
		if (deleted === 1) {
			return { msg: 'successfully deleted' }
		} else if (deleted === 0) {
			throw new HttpException('No place with such id', HttpStatus.BAD_REQUEST)
		}
	}
}
