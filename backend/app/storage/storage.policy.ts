import type { S3BucketPolicy } from "#lib/storage/s3.storage.ts"

const policy = (bucket: string): S3BucketPolicy => ({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucket}/public/*`],
    },
    // INFO: Deny is default, this is just here to showcase the public/private paths structure
    {
      Effect: "Deny",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucket}/private/*`],
    },
  ],
})

export default policy
