import { makeListTasksUseCase } from "@/use-cases/tasks/list/factory"
import { FastifyReply, FastifyRequest } from "fastify"

export async function listTasksController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeListTasksUseCase()

  const response = await useCase.execute()

  return reply.status(200).send(response)
}