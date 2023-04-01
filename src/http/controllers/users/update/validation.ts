import { z } from "zod"

const schema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().min(3).max(255).optional(),
  password: z.string().min(6).max(255).optional(),
})

export function validate(input: unknown) {
  return schema.parse(input)
}