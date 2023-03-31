import { z } from "zod"

const registerSchema = z.object({
  user_id: z.string().uuid(),
})

export function validate(input: unknown) {
  return registerSchema.parse(input)
}