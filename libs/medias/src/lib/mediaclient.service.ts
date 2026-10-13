import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MEDIA_PATTERNS, UploadedImage } from "./contracts";

@Injectable()
export class MediaClientService {
  constructor(@Inject('MEDIA_SERVICE') private readonly media: ClientProxy) {}

  upload(base64: string, folder = 'products'): Promise<UploadedImage> {
    return firstValueFrom(
      this.media
        .send<UploadedImage>({ cmd: MEDIA_PATTERNS.UPLOAD }, { buffer: base64, folder })
        .pipe(timeout(30000)),
    );
  }

  async uploadMany(base64List: string[], folder = 'products'): Promise<UploadedImage[]> {
    const results = await Promise.allSettled(base64List.map((b) => this.upload(b, folder)));

    const uploaded = results
      .filter((r): r is PromiseFulfilledResult<UploadedImage> => r.status === 'fulfilled')
      .map((r) => r.value);

    const failed = results.find((r) => r.status === 'rejected') as PromiseRejectedResult | undefined;
    if (failed) {
      await this.deleteMany(uploaded); // roll back the ones that succeeded
      throw failed.reason;
    }
    return uploaded;
  }

  async deleteMany(images: UploadedImage[]) {
    await Promise.allSettled(
      images.map((i) =>
        firstValueFrom(this.media.send({ cmd: MEDIA_PATTERNS.DELETE }, { publicId: i.publicId })),
      ),
    );
  }
}