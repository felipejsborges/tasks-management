import { env } from "@/env"
import { AppError } from "@/errors/AppError"
import { FastifyReply } from "fastify"

export async function errorHandler(
  error: Error,
  _,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    reply.status(error.code).send({ error: error.message })
  } else {
    if (env.NODE_ENV !== "dev") {
      // send to external tool
    }
    console.error(error)
    reply.status(500).send({ error: "Internal Server Error" })
  }
}
