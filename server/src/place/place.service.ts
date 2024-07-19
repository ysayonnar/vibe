import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Place } from './place.model'
import { PlaceCreationDto } from './dto/place.dto'
import { UserService } from 'src/user/user.service'
import sequelize from 'sequelize'

@Injectable()
export class PlaceService {
	constructor(
		@InjectModel(Place) private PlaceRepository: typeof Place,
		readonly userService: UserService
	) {}

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

	async createPlace(dto: PlaceCreationDto, user) {
		const existingPlace = await this.PlaceRepository.findOne({
			where: { longtitude: dto.longtitude, width: dto.width },
		})
		if (existingPlace) {
			throw new HttpException(
				'This place already exists.',
				HttpStatus.BAD_REQUEST
			)
		}
		try {
			const createdPlace = await this.PlaceRepository.create({
				...dto,
				userId: user.id,
			})
			return createdPlace
		} catch (e) {
			throw new HttpException('Something went wrong', HttpStatus.BAD_GATEWAY)
		}
	}

	async updatePlace(dto: PlaceCreationDto, placeId: number, user) {
		const userPlaces: Place[] = (await this.userService.getUserById(user.id))
			.created_places

		if (!userPlaces.some(place => place.id == placeId)) {
			throw new HttpException(
				'This place is not for this user or place already deleted',
				HttpStatus.BAD_REQUEST
			)
		}

		const updatedPlace = await this.getPlaceById(placeId).then(placeData =>
			placeData.update({ ...placeData, ...dto })
		)
		return updatedPlace
	}

	async delete(placeId: number, user) {
		const userPlaces: Place[] = (await this.userService.getUserById(user.id))
			.created_places

		if (!userPlaces.some(place => place.id == placeId)) {
			throw new HttpException(
				'This place is not for this user or place already deleted',
				HttpStatus.BAD_REQUEST
			)
		}
		await this.getPlaceById(placeId)
			.then(place => place.destroy())
			.catch(() => new HttpException('Not deleted', HttpStatus.BAD_GATEWAY))
		return { msg: 'deleted' }
	}

	async findPlaceByName(searchQuery: string) {
		const places: Place[] = await this.PlaceRepository.findAll()
		const foundedPlaces: Place[] = []

		for (let i = 0; i < places.length; i++) {
			const place: Place = places[i]
			const check = place.name
				.toLowerCase()
				.startsWith(searchQuery.toLowerCase())
			if (check) {
				foundedPlaces.push(place)
			}
		}

		if (foundedPlaces.length === 0) {
			return { msg: 'Nothing found.' }
		}
		return foundedPlaces
	}
}
