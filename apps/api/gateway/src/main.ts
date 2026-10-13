/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import "dotenv/config"

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {GatewayExceptionFilter} from "@ecommerce/filters"

async function bootstrap() {
  process.title="gateway"
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT ;
  app.enableCors({origin:process.env.WEB_URL})
  app.useGlobalFilters(new GatewayExceptionFilter() )
  await app.listen(port);
  Logger.log(`🚀 GATEWAY is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
