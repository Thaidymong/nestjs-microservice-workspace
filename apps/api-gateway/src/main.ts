import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Microservice Workshop API Gateway with NestJS')
    .setDescription(
      'A Dockerized API gateway that unifies and secures communication between microservices, providing a single scalable entry point for the system.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(port);

  Logger.log(
    `Gateway service is running on: http://localhost:${process.env.port ?? 3000}`,
  );
}
bootstrap();
