import { z } from "zod"

const schema = z.object({
  taskId: z.string().uuid(),
})

export function validate(input: unknown) {
  return schema.parse(input)
}
