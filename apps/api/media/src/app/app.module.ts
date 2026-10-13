import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,CloudinaryProvider],
})
export class AppModule {}
