import { FastifyRequest } from "fastify"
import { InvalidJwt } from "./errors/invalid-jwt"

export async function verifyJwt(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (err) {
    console.error(err)
    throw new InvalidJwt()
  }
}
