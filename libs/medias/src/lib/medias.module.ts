import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MediaClientService } from "./mediaclient.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEDIA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env["RABBITMQ_URL"] as string],
          queue: 'media_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [MediaClientService],
  exports: [MediaClientService],
})
export class MediaClientModule {}