import { makeRegisterUseCase } from "@/use-cases/users/register/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, name, password } = validate(request.body)

  const useCase = makeRegisterUseCase()

  const response = await useCase.execute({
    email,
    name,
    password,
  })

  return reply.status(200).send(response)
}