import { makeLoginUseCase } from "@/use-cases/users/login/factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { validate } from "./validation"

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = validate(request.body)

  const useCase = makeLoginUseCase()

  const response = await useCase.execute({
    email,
    password,
  })

  const payload = {
    user_id: response.user.id,
  }

  const token = reply.jwtSign(payload, { expiresIn: "1m" }) // 10m, 10h, 7d

  reply.status(201).send({ token })
}