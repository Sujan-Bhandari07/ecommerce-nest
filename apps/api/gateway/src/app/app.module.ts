import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Transport,ClientsModule} from "@nestjs/microservices"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.USER_QUEUE,
          queueOptions: { durable: true },
        },
      },

{
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.ORDER_QUEUE,
          queueOptions: { durable: true },
        },
      },

      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.PAYMENT_QUEUE,
          queueOptions: { durable: true },
        },
      },


      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.PRODUCT_QUEUE,
          queueOptions: { durable: true },
        },
      },


      {
        name: 'MEDIA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.MEDIA_QUEUE,
          queueOptions: { durable: true },
        },
      },


    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
