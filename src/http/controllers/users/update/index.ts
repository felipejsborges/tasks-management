import { GenericObject } from "@/interfaces/generic-object"
import { makeUpdateUserUseCase } from "@/use-cases/users/update/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const input = {
    ...(request.body as GenericObject),
    ...(request.params as GenericObject),
  } as GenericObject

  const { userId, ...payload } = validate(input)

  const useCase = makeUpdateUserUseCase()

  const response = await useCase.execute(userId, payload)

  return reply.status(200).send(response)
}