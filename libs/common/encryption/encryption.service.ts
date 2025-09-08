import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  private readonly secretKey: string;
  private readonly algorithm: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.getOrThrow<string>(
      'ENCRYPTION_SECRET_KEY',
      'secret',
    );
    this.algorithm = this.configService.getOrThrow<string>(
      'ENCRYPTION_ALGORITHM',
      'aes-256-ctr',
    );
  }

  async encrypt(plainText: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(this.secretKey, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(plainText),
      cipher.final(),
    ]);

    // Use Base64 encoding to shorten the string
    const ivBase64 = iv.toString('base64');
    const encryptedBase64 = encryptedText.toString('base64');
    return `${ivBase64}:${encryptedBase64}`;
  }

  async decrypt(encryptedText: string): Promise<string> {
    if (!encryptedText.includes(':')) {
      throw new Error('Invalid encrypted text');
    }

    try {
      const [ivBase64, encryptedBase64] = encryptedText.split(':');
      const key = (await promisify(scrypt)(
        this.secretKey,
        'salt',
        32,
      )) as Buffer;
      const iv = Buffer.from(ivBase64, 'base64');
      const encryptedData = Buffer.from(encryptedBase64, 'base64');

      const decipher = createDecipheriv(this.algorithm, key, iv);
      const decryptedText = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
      ]);
      return decryptedText.toString();
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }
}
