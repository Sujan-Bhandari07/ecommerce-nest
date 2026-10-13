/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import "dotenv/config"
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  process.title = "Order service";
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.ORDER_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  Logger.log("Order service started");
}

bootstrap();
