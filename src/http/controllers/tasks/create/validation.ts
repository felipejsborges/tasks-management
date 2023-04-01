import { z } from "zod"

const schema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  effort: z.number().min(1).max(999)
})

export function validate(input: unknown) {
  return schema.parse(input)
}
