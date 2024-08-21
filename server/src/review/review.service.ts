import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Review } from './review.model'
import { ReviewCreationDto } from './dto/review.dto'
import { PlaceService } from 'src/place/place.service'
import { Place } from 'src/place/place.model'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { NotBelongsException } from 'src/exceptions/not-belongs.exception'

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
			throw new NotFoundException('Review')
		}
		return review
	}

	async getAllReviews() {
		const reviews = await this.reviewRepository.findAll({
			include: { all: true },
		})
		return reviews
	}

	async createReview(placeId, dto: ReviewCreationDto, user) {
		if (dto.grade > 5 || dto.grade < 1) {
			throw new HttpException(
				'Grade must be from 1 to 5',
				HttpStatus.BAD_REQUEST
			)
		}
		const candidate = await this.reviewRepository.findOne({
			where: {
				userId: user.id,
				placeId: placeId,
			},
		})
		if (candidate) {
			throw new HttpException(
				'You cant create more than one review for this place',
				HttpStatus.BAD_GATEWAY
			)
		}
		const createdReview = await this.reviewRepository.create({
			...dto,
			userId: user.id,
			placeId: placeId,
		})
		await this.calculateRating(placeId)
		return createdReview
	}

	async updateReview(reviewId, dto: ReviewCreationDto, user) {
		if (dto.grade > 5 || dto.grade < 1) {
			throw new HttpException(
				'Grade must be from 1 to 5',
				HttpStatus.BAD_REQUEST
			)
		}
		const review: Review = await this.getReviewById(reviewId)
		if (review.userId != user.id) {
			throw new NotBelongsException('Review')
		}
		await review.update({ ...dto })
		await review.save()
		await this.calculateRating(review.placeId)
		return review
	}

	async deleteReview(id: number, user) {
		const review = await this.getReviewById(id)
		if (review.userId != user.id) {
			throw new NotBelongsException('Review')
		}
		await review.destroy()
		await this.calculateRating(review.placeId)
		return { msg: 'deleted' }
	}
}
