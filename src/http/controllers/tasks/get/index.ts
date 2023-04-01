import { makeGetTaskUseCase } from "@/use-cases/tasks/get/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function getTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { taskId } = validate(request.params)

  const useCase = makeGetTaskUseCase()

  const response = await useCase.execute(taskId)

  return reply.status(200).send(response)
}