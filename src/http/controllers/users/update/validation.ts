import { z } from "zod"

const registerSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().min(3).max(255).optional(),
  password: z.string().min(6).max(255).optional(),
})

export function validate(input: unknown) {
  return registerSchema.parse(input)
}