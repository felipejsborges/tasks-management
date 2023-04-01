import { makeProfileUseCase } from "@/use-cases/users/profile/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = validate(request.params)

  const useCase = makeProfileUseCase()

  const response = await useCase.execute(userId)

  return reply.status(200).send(response)
}