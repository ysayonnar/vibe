import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Place } from './place.model'
import { PlaceCreationDto } from './dto/place.dto'
import { UserService } from 'src/user/user.service'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class PlaceService {
	constructor(
		@InjectModel(Place) private PlaceRepository: typeof Place,
		readonly userService: UserService,
		readonly filesService: FilesService
	) {}

	async getAllPlaces() {
		const places = await this.PlaceRepository.findAll({
			include: { all: true },
		})
		return places
	}

	async getPlaceById(id: number) {
		const place = await this.PlaceRepository.findByPk(id, {
			include: { all: true },
		})
		if (place) {
			return place
		}
		throw new HttpException('no place with such id', HttpStatus.NOT_FOUND)
	}

	async createPlace(dto: PlaceCreationDto, user, image) {
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
			const fileName = await this.filesService.createFile(image)
			const createdPlace = await this.PlaceRepository.create({
				...dto,
				userId: user.id,
				image: fileName,
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

	async changePhoto(user, file, placeId) {
		const place = await this.getPlaceById(placeId)
		if (place.userId != user.id) {
			throw new HttpException(
				'This place is not for this user',
				HttpStatus.FORBIDDEN
			)
		}
		if (place.image.length == 0) {
			const fileName = await this.filesService.createFile(file)
			await place.update({ ...place, image: fileName })
		} else {
			await this.filesService.rewriteFile(file, place.image)
		}
		return place
	}

	async deletePhoto(placeId: number, user) {
		const place = await this.getPlaceById(placeId)
		if (place.userId != user.id) {
			throw new HttpException(
				'This place is not for this user',
				HttpStatus.FORBIDDEN
			)
		}
		if (place.image.length == 0) {
			throw new HttpException('No photo for this place', HttpStatus.BAD_REQUEST)
		}
		await this.filesService.deletePhoto(place.image)
		await place.update({ ...place, image: '' })
		return { msg: 'deleted' }
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
			.then(place => {
				this.filesService.deletePhoto(place.image)
				place.destroy()
			})
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
