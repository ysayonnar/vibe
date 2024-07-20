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
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ReviewCreationDto } from './dto/review.dto'
import { ReviewUpdateDto } from './dto/reviewUpdate.dto'

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

	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async createReview(@Body() dto: ReviewCreationDto, @Req() req) {
		return this.reviewService.createReview(dto, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Put('/update')
	async updateReview(@Body() dto: ReviewUpdateDto, @Req() req) {
		return this.reviewService.updateReview(dto, req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/delete/:id')
	async deleteReview(@Param('id') id: number, @Req() req) {
		return this.reviewService.deleteReview(id, req.user)
	}
}
