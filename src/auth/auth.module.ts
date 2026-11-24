import { Module, Global } from '@nestjs/common';
import { HashingService } from './hashing/hash.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  controllers: [ AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    AuthService,
  ],
  exports: [HashingService]
})
export class AuthModule { }