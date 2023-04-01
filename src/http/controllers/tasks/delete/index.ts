import { makeDeleteTaskUseCase } from "@/use-cases/tasks/delete/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function deleteTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { taskId } = validate(request.params)

  const useCase = makeDeleteTaskUseCase()

  await useCase.execute(taskId)

  return reply.status(204).send()
}