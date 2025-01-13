import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { PharmacyRepository } from './repositories/pharmacy.repository';
import { ReviewRepository } from './repositories/review.repository';
import { UserController } from './auth/user.controller';
import { UserModule } from './auth/user.module';


@Global()
@Module({
  imports: [
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, PharmacyRepository, ReviewRepository],
  exports: [UserRepository, PharmacyRepository, ReviewRepository]
})
export class AppModule {}
