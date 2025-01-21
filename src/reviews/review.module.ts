import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from '../repositories/review.repository';
import { PharmacyModule } from '../pharmacies/pharmacy.module';
import { FirestoreModule } from '../firestore/firestore.module';

@Module({
    imports: [
        PharmacyModule,
        FirestoreModule,
    ],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository],
    exports: [ReviewService],
})
export class ReviewModule { } 