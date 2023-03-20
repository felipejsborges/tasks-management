import * as bcrypt from "bcrypt"
import { HashProvider } from "./interface"

export class BCryptHashProvider implements HashProvider {
  async hash(payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, 8)
		
    return hash
  }
  async compare(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash)
  }

}