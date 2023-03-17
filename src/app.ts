import fastify from "fastify"
import { errorHandler } from "./errors/handler"

export const app = fastify()
app.setErrorHandler(errorHandler)