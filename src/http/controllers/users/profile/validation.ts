import { z } from "zod"

const registerSchema = z.object({
  userId: z.string().uuid(),
})

export function validate(input: unknown) {
  return registerSchema.parse(input)
}