import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(process.env.port ?? 3000);

  Logger.log(
    `Gateway service is running on: http://localhost:${process.env.port ?? 3000}`,
  );
}
bootstrap();
