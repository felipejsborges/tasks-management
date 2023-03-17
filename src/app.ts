import fastify from "fastify"
import { errorHandler } from "./http/controllers/_utils/errorHandler"

export const app = fastify()

app.setErrorHandler(errorHandler)
