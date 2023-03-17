import { HashProvider } from "./interface"

export class InMemoryHashProvider implements HashProvider {
  async hash(payload: string): Promise<string> {
    return payload + "hashed"
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return payload + "hashed" === hashed
  }
}