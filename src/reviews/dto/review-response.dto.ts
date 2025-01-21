import { Expose } from 'class-transformer';

export class ReviewResponseDto {
    @Expose()
    id: string;

    @Expose()
    pharmacyId: string;

    @Expose()
    userId: string;

    @Expose()
    rating: number;

    @Expose()
    comment?: string;

    @Expose()
    createdAt: Date;

    constructor(partial: Partial<ReviewResponseDto>) {
        Object.assign(this, partial);
    }
} 