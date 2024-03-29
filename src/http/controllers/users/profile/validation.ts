import { z } from "zod"

const schema = z.object({
  userId: z.string().uuid(),
})

export function validate(input: unknown) {
  return schema.parse(input)
}