import fastify from "fastify"
import { fastifyJwt } from "@fastify/jwt"

import { errorHandler } from "./http/controllers/_utils/errorHandler"

import { publicRoutes } from "./http/routes/public"
import { privateRoutes } from "./http/routes/private"

export const app = fastify()

app.setErrorHandler(errorHandler)

app.register(fastifyJwt, { secret: process.env.JWT_SECRET })
app.register(publicRoutes)
app.register(privateRoutes)
