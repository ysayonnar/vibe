import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ReviewCreationDto } from './dto/review.dto'

@Controller('review')
export class ReviewController {
	constructor(readonly reviewService: ReviewService) {}

	@Get()
	async getAllReviews() {
		return this.reviewService.getAllReviews()
	}

	@Get('/:id')
	async getReviewById(@Param('id') id: number) {
		return this.reviewService.getReviewById(id)
	}

	@Get('/byPlaceId/:id')
	async getReviewsByPlaceId(@Param('id') id: number) {
		return this.reviewService.getReviewsByPlaceId(id)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Post('/create/:id')
	async createReview(
		@Param('id') id: number,
		@Body() dto: ReviewCreationDto,
		@Req() req
	) {
		return this.reviewService.createReview(id, dto, req.user)
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Put('/update/:id')
	async updateReview(
		@Param('id') id: number,
		@Body() dto: ReviewCreationDto,
		@Req() req
	) {
		return this.reviewService.updateReview(id, dto, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/delete/:id')
	async deleteReview(@Param('id') id: number, @Req() req) {
		return this.reviewService.deleteReview(id, req.user)
	}
}
