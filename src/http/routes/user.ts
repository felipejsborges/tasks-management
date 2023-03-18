import { FastifyPluginAsync } from "fastify"
import { registerController } from "../controllers/users/register"
import { loginController } from "../controllers/users/login"
import fastifyJwt from "@fastify/jwt"

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", registerController)
	
  app.register(fastifyJwt, {secret: process.env.JWT_SECRET})
  app.post("/sessions", loginController)
}