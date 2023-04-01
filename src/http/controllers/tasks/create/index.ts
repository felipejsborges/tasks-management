import { makeCreateTaskUseCase } from "@/use-cases/tasks/create/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId, title, description, effort } = validate(request.body)

  const useCase = makeCreateTaskUseCase()

  const response = await useCase.execute({ userId, title, description, effort })

  return reply.status(201).send(response)
}