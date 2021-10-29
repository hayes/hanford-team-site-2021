import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { s3 } from '../lib/s3';
import { builder } from './builder';

export const bucketParams = {
  Bucket: `test-bucket-${Math.ceil(Math.random() * 10 ** 10)}`,
  Key: `test-object-${Math.ceil(Math.random() * 10 ** 10)}`,
  Body: 'BODY',
};

const UploadURL = builder.simpleObject('UploadURL', {
  fields: (t) => ({
    uploadUrl: t.string(),
    key: t.string(),
  }),
});

builder.mutationField('createUploadUrl', (t) =>
  t.field({
    type: UploadURL,
    args: {
      extension: t.arg.string(),
    },
    resolve: async (parent, args) => {
      const bucket = 'hanford-howl-2021';
      const key = `${randomUUID()}${args.extension ? `.${args.extension}` : ''}`;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const signedUrl = await getSignedUrl(s3, command, {
        expiresIn: 3600,
      });

      return {
        uploadUrl: signedUrl,
        key,
      };
    },
  }),
);
