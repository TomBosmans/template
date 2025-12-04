export interface ObjectStorage {
  /**
   * Uploads or updates an object in the bucket.
   * @param params.path Path/key of the object.
   * @param params.buffer Content buffer to upload.
   */
  upsertObject(params: { path: string; buffer: Buffer }): Promise<void>

  /**
   * Generates a presigned URL to download an object.
   * @param params.path Path/key of the object.
   * @param params.expiry Expiry time in seconds.
   */
  presignedGetObject(params: { path: string; expiry: number }): Promise<string>

  /**
   * Deletes an object from the bucket.
   * @param params.path Path/key of the object.
   */
  deleteObject(params: { path: string }): Promise<void>

  /**
   * Creates the bucket.
   * @param params.soft If true, only creates bucket if it doesn't exist.
   */
  createBucket(params?: { soft?: boolean }): Promise<void>

  /**
   * Removes all objects from the bucket.
   */
  clearBucket(): Promise<void>

  /**
   * Deletes the bucket.
   * @param hard If true, empties the bucket first.
   */
  removeBucket(params?: { hard?: boolean }): Promise<void>

  /**
   * Copies an object within the bucket.
   * @param params.sourcePath Source key.
   * @param params.destinationPath Destination key.
   */
  copyObject(params: { sourcePath: string; destinationPath: string }): Promise<void>

  /**
   * Retrieves the object content as a Buffer.
   * @param params.path Path/key of the object.
   */
  getObject(params: { path: string }): Promise<Buffer | null>
}
