import { hash, verify } from "@node-rs/argon2"
import type Hasher from "./interface.ts"

export default class Argon2Hasher implements Hasher {
  public async hash(value: string) {
    return await hash(value, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })
  }

  public async verify(hash: string, value: string) {
    return await verify(hash, value)
  }
}
