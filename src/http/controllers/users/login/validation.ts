import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(6).max(255),
})

export function validate(input: unknown) {
  return loginSchema.parse(input)
}