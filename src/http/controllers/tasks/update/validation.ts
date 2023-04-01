import { z } from "zod"

const schema = z.object({
  taskId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  effort: z.number().min(1).max(999).optional()
})

export function validate(input: unknown) {
  return schema.parse(input)
}
