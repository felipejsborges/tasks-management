import { HashProvider } from "./interface"

export class InMemoryHashProvider implements HashProvider {
  async hash(payload: string): Promise<string> {
    return payload + "hash"
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return payload + "hash" === hash
  }
}