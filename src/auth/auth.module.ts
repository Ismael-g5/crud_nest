import { Module, Global } from '@nestjs/common';
import { HashingService } from './hashing/hash.service';
import { BcryptService } from './hashing/bcrypt.service';

@Global()
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
  ],
  exports: [HashingService]
})
export class AuthModule { }