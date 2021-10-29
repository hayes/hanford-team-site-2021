require('dotenv').config();

import { S3 } from '@aws-sdk/client-s3';

export const s3 = new S3({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.HANFORD_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.HANFORD_AWS_SECRET_ACCESS_KEY!,
  },
});
