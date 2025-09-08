import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
