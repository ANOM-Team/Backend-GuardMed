import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@Controller('reviews')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    async createReview(
        @Request() req,
        @Body() createReviewDto: CreateReviewDto,
    ): Promise<ReviewResponseDto> {
        console.log('User from request:', req.user);

        if (!req.user || !req.user.userId) {
            throw new UnauthorizedException('User not authenticated or invalid user data');
        }

        const review = await this.reviewService.createReview(req.user.userId, createReviewDto);
        return new ReviewResponseDto(review);
    }

    @Get('pharmacy/:pharmacyId')
    async getPharmacyReviews(@Param('pharmacyId') pharmacyId: string): Promise<ReviewResponseDto[]> {
        const reviews = await this.reviewService.getPharmacyReviews(pharmacyId);
        return reviews.map(review => new ReviewResponseDto(review));
    }

    @Get('user')
    async getUserReviews(@Request() req): Promise<ReviewResponseDto[]> {
        // Vérification de debug
        console.log('User from request:', req.user);

        if (!req.user || !req.user.userId) {
            throw new UnauthorizedException('User not authenticated or invalid user data');
        }

        const reviews = await this.reviewService.getUserReviews(req.user.userId);
        return reviews.map(review => new ReviewResponseDto(review));
    }

    @Delete(':id')
    async deleteReview(@Request() req, @Param('id') id: string): Promise<void> {
        return this.reviewService.deleteReview(req.user.userId, id);
    }
} 