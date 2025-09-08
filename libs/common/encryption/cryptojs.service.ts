import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';

@Injectable()
export class CryptoJSService {
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    try {
      this.secretKey = this.configService.getOrThrow<string>(
        'ENCRYPTION_SECRET_KEY',
      );
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve encryption secret key from config.',
      );
    }
  }

  encrypt(text: string): string {
    try {
      const cipherText = CryptoJS.AES.encrypt(text, this.secretKey);
      return cipherText.toString();
    } catch (error) {
      throw new BadRequestException('Failed to encrypt the text.');
    }
  }

  decrypt(cipherText: string): string {
    try {
      const decipherText = CryptoJS.AES.decrypt(cipherText, this.secretKey);

      const plainText = decipherText.toString(CryptoJS.enc.Utf8);

      if (!plainText || plainText.trim() === '') {
        throw new NotFoundException('Invalid cipher text.');
      }

      return plainText;
    } catch (error) {
      throw new BadRequestException('Failed to decrypt the text.');
    }
  }
}
