import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MEDIA_PATTERNS, UploadImagePayload } from '@ecommerce/medias';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly media: AppService) {}

  @MessagePattern({ cmd: MEDIA_PATTERNS.UPLOAD })
  upload(@Payload() data: UploadImagePayload) {
    return this.media.upload(Buffer.from(data.buffer, 'base64'), data.folder);
  }

  @MessagePattern({ cmd: MEDIA_PATTERNS.DELETE })
  delete(@Payload() data: { publicId: string }) {
    return this.media.delete(data.publicId);
  }
}