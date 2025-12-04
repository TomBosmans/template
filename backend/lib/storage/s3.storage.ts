import * as s3 from "@aws-sdk/client-s3"
import { PutBucketPolicyCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type Logger from "#lib/logger/interface.ts"
import type { ObjectStorage } from "./interface.ts"

export type S3StorageOptions = {
  config: { s3: s3.S3ClientConfig & { bucket: string } }
  logger: Logger
}

export type S3BucketPolicy = {
  Version: string // usually "2012-10-17"
  Statement: Array<{
    Sid?: string
    Effect: "Allow" | "Deny"
    Principal: string | { [key: string]: unknown } | "*"
    Action: string | string[]
    Resource: string | string[]
    Condition?: Record<string, unknown>
  }>
}

export default function s3StorageFactory(policy: (bucket: string) => S3BucketPolicy) {
  return class S3Storage implements ObjectStorage {
    static client: s3.S3Client
    private bucket: string
    private logger: Logger

    constructor({ config, logger }: S3StorageOptions) {
      const { bucket, ...options } = config.s3
      S3Storage.client ||= new s3.S3Client(options)
      this.bucket = bucket
      this.logger = logger
    }

    public async upsertObject(params: { path: string; buffer: Buffer }) {
      await S3Storage.client.send(
        new s3.PutObjectCommand({
          Bucket: this.bucket,
          Key: params.path,
          Body: params.buffer,
        }),
      )
    }

    public async presignedGetObject(params: { path: string; expiry: number }) {
      const command = new s3.GetObjectCommand({
        Bucket: this.bucket,
        Key: params.path,
      })

      return await getSignedUrl(S3Storage.client, command, {
        expiresIn: params.expiry,
      })
    }

    public async deleteObject(params: { path: string }) {
      await S3Storage.client.send(
        new s3.DeleteObjectCommand({
          Bucket: this.bucket,
          Key: params.path,
        }),
      )
    }

    public async updatePolicy() {
      await S3Storage.client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: JSON.stringify(policy(this.bucket)),
        }),
      )
      this.logger.info(`Set ${this.bucket} policy`, { bucket: this.bucket, policy })
    }

    public async createBucket(params?: { soft?: boolean }) {
      if (params?.soft) {
        try {
          await S3Storage.client.send(new s3.HeadBucketCommand({ Bucket: this.bucket }))
          return
        } catch {}
      }

      await S3Storage.client.send(new s3.CreateBucketCommand({ Bucket: this.bucket }))
      this.logger.info(`Bucket: ${this.bucket} is created`)
    }

    public async clearBucket(): Promise<void> {
      while (true) {
        const list = await S3Storage.client.send(
          new s3.ListObjectsV2Command({
            Bucket: this.bucket,
            MaxKeys: 1000,
          }),
        )

        const objects = list.Contents ?? []
        if (objects.length === 0) return

        await S3Storage.client.send(
          new s3.DeleteObjectsCommand({
            Bucket: this.bucket,
            Delete: { Objects: objects.map((obj) => ({ Key: obj.Key })), Quiet: true },
          }),
        )

        if (!list.IsTruncated) return
      }
    }

    public async removeBucket({ hard }: { hard?: boolean } = {}): Promise<void> {
      if (hard) await this.clearBucket()
      await S3Storage.client.send(new s3.DeleteBucketCommand({ Bucket: this.bucket }))
    }

    public async copyObject(params: { sourcePath: string; destinationPath: string }) {
      await S3Storage.client.send(
        new s3.CopyObjectCommand({
          Bucket: this.bucket,
          Key: params.destinationPath,
          CopySource: `${this.bucket}/${params.sourcePath}`,
        }),
      )
    }

    public async getObject(params: { path: string }) {
      const { Body } = await S3Storage.client.send(
        new s3.GetObjectCommand({
          Bucket: this.bucket,
          Key: params.path,
        }),
      )

      if (!Body) return null

      const chunks: Uint8Array[] = []
      // biome-ignore lint/suspicious/noExplicitAny: It is ok?
      for await (const chunk of Body as any) {
        chunks.push(chunk)
      }

      return Buffer.concat(chunks)
    }
  }
}
