import { GenericObject } from "@/interfaces/generic-object"
import { makeUpdateTaskUseCase } from "@/use-cases/tasks/update/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function updateTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const input = {
    ...(request.body as GenericObject),
    ...(request.params as GenericObject),
  }

  const { taskId, ...payload } = validate(input)

  const useCase = makeUpdateTaskUseCase()

  const response = await useCase.execute(taskId, payload)

  return reply.status(200).send(response)
}