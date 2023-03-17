import { HashProvider } from "./interface"

export class InMemoryHashProvider implements HashProvider {
  async hash(payload: string): Promise<string> {
    return payload
  }
}