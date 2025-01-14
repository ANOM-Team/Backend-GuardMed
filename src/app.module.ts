import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { PharmacyRepository } from './repositories/pharmacy.repository';
import { ReviewRepository } from './repositories/review.repository';
import { UserModule } from './auth/user.module';
import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, PharmacyRepository, ReviewRepository],
  exports: [UserRepository, PharmacyRepository, ReviewRepository, MailModule],
})
export class AppModule {}
