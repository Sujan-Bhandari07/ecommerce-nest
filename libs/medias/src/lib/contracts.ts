

export const MEDIA_PATTERNS = {
  UPLOAD: 'media.upload',
  DELETE: 'media.delete',
} as const;

export interface UploadImagePayload {
  buffer: string; // base64
  folder?: string;
}

export interface UploadedImage {
  url: string; // secure_url
  publicId: string;
}


// export it from index.ts