import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { CryptoJSService } from './cryptojs.service';

@Module({
  imports: [],
  providers: [EncryptionService, CryptoJSService],
  exports: [EncryptionService, CryptoJSService],
})
export class EncryptionModule {}
