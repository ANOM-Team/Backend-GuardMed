import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export interface ReviewData {
    userId: string;
    pharmacyId: string;
    rating: number;
    createdAt: Date;
    comment?: string;
}

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    pharmacyId: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    comment?: string;
} 