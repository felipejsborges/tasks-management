import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  TESTS_DB_SCHEMA: z.string().default("tests"),
})

const validatedEnv = envSchema.safeParse(process.env)

if (validatedEnv.success === false) {
  throw new Error("Invalid environment variables. " + validatedEnv.error.format())
}

export const env = validatedEnv.data
