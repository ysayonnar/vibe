import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Review } from './review.model'
import { ReviewCreationDto } from './dto/review.dto'
import { ReviewUpdateDto } from './dto/reviewUpdate.dto'
import { PlaceService } from 'src/place/place.service'
import { Place } from 'src/place/place.model'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review) private reviewRepository: typeof Review,
		readonly placeService: PlaceService
	) {}

	async calculateRating(placeId) {
		const place: Place = await this.placeService
			.getPlaceById(placeId)
			.then(place => {
				let calculatedRating = 0
				for (let i = 0; i < place.reviews.length; i++) {
					calculatedRating += place.reviews[i].grade
				}
				calculatedRating = calculatedRating / place.reviews.length
				place.calculatedRating = calculatedRating
				place.save()
				return place
			})
	}

	async getReviewById(id: number) {
		const review = await this.reviewRepository.findByPk(id)
		if (!review) {
			throw new HttpException('No review with such id', HttpStatus.NOT_FOUND)
		}
		return review
	}

	async getAllReviews() {
		const reviews = await this.reviewRepository.findAll({
			include: { all: true },
		})
		return reviews
	}

	async createReview(dto: ReviewCreationDto, user) {
		if (dto.grade > 5 || dto.grade < 1) {
			throw new HttpException(
				'Grade must be from 1 to 5',
				HttpStatus.BAD_REQUEST
			)
		}
		const candidate = await this.reviewRepository.findOne({
			where: {
				userId: user.id,
				placeId: dto.placeId,
			},
		})
		if (candidate) {
			throw new HttpException(
				'You cant create more than one review for this place',
				HttpStatus.BAD_REQUEST
			)
		}
		const createdReview = await this.reviewRepository.create({
			...dto,
			userId: user.id,
		})
		await this.calculateRating(dto.placeId)
		return createdReview
	}

	async updateReview(dto: ReviewUpdateDto, user) {
		if (dto.grade > 5 || dto.grade < 1) {
			throw new HttpException(
				'Grade must be from 1 to 5',
				HttpStatus.BAD_REQUEST
			)
		}
		const review: Review = await this.getReviewById(dto.reviewId)
		if (review.userId != user.id) {
			throw new HttpException(
				'This review is not for this user',
				HttpStatus.BAD_REQUEST
			)
		}
		await review.update({ ...dto })
		await review.save()
		await this.calculateRating(review.placeId)
		return review
	}

	async deleteReview(id: number, user) {
		const review = await this.getReviewById(id)
		if (review.userId != user.id) {
			throw new HttpException(
				'This review is not for this user',
				HttpStatus.BAD_REQUEST
			)
		}
		await review.destroy()
		await this.calculateRating(review.placeId)
		return { msg: 'deleted' }
	}
}
