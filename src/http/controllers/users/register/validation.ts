import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  password: z.string().min(6).max(255),
})

export function validate(input: unknown) {
  return registerSchema.parse(input)
}