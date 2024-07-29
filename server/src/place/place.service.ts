import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Place } from './place.model'
import { PlaceCreationDto } from './dto/place.dto'
import { UserService } from 'src/user/user.service'
import { FilesService } from 'src/files/files.service'
import { CategoryService } from 'src/category/category.service'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { ServerErrorException } from 'src/exceptions/server-error.exception'
import { NotBelongsException } from 'src/exceptions/not-belongs.exception'

@Injectable()
export class PlaceService {
	constructor(
		@InjectModel(Place) private PlaceRepository: typeof Place,
		readonly userService: UserService,
		readonly filesService: FilesService,
		readonly categoryService: CategoryService
	) {}

	isPlaceInRadius(target, places, radius: number = 5): boolean {
		const R = 6371e3 // Радиус Земли в метрах

		function toRadians(degrees: number): number {
			return degrees * (Math.PI / 180)
		}

		function haversineDistance(coord1, coord2): number {
			const width1 = toRadians(coord1.width)
			const width2 = toRadians(coord2.width)
			const deltaWidth = toRadians(coord2.width - coord1.width)
			const deltaLon = toRadians(coord2.longtitude - coord1.longtitude)

			const a =
				Math.sin(deltaWidth / 2) * Math.sin(deltaWidth / 2) +
				Math.cos(width1) *
					Math.cos(width2) *
					Math.sin(deltaLon / 2) *
					Math.sin(deltaLon / 2)

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

			return R * c // Расстояние в метрах
		}

		return places.some(place => haversineDistance(target, place) <= radius)
	}

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
		if (!place) {
			throw new NotFoundException('Place')
		}
		return place
	}

	async createPlace(dto: PlaceCreationDto, user, image) {
		const places = await this.getAllPlaces()
		if (this.isPlaceInRadius(dto, places, 5)) {
			throw new HttpException(
				'Place cant be created in this area',
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
			throw new ServerErrorException()
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
			throw new NotBelongsException('Place')
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
			throw new NotBelongsException('Place')
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
			.catch(() => new ServerErrorException())
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

	async filterByCategories(categoriesId: number[]) {
		const places = await this.getAllPlaces()
		return places.filter(place => {
			const placeCategoryIds = place.categories.map(category => category.id)
			return categoriesId.every(id => placeCategoryIds.includes(id))
		})
	}

	async filterByRating(minimalRate: number) {
		if (minimalRate > 5 || minimalRate < 1) {
			throw new HttpException(
				'Rating should be from 1 to 5',
				HttpStatus.BAD_REQUEST
			)
		}
		const places = await this.getAllPlaces()
		return places.filter(place => place.calculatedRating >= minimalRate)
	}

	async setCategories(placeId, categoriesId, user) {
		const place = await this.getPlaceById(placeId)
		if (place.userId != user.id) {
			throw new NotBelongsException('Place')
		}
		try {
			await Promise.all(
				categoriesId.map(
					async id => await this.categoryService.getCategoryById(id)
				)
			)
		} catch (e) {
			if (e instanceof HttpException) {
				throw e
			}
			throw new NotFoundException('Category')
		}
		await place.$set('categories', categoriesId)
		const categories = await Promise.all(
			categoriesId.map(
				async id => await this.categoryService.getCategoryById(id)
			)
		)
		place.categories = categories
		await place.save()
		const saved = await this.getPlaceById(placeId)
		return saved
	}

	async addToFavourite(placeId, jwtUser) {
		const place = await this.getPlaceById(placeId)
		await place.$add('favourite_users', jwtUser.id)
		return place
	}

	async deleteFromFavourite(placeId, jwtUser) {
		const place = await this.getPlaceById(placeId)
		await place.$remove('favourite_users', jwtUser.id)
		return place
	}
}
