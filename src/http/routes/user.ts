import { FastifyPluginAsync } from "fastify"
import { registerController } from "../controllers/users/register"
import { loginController } from "../controllers/users/login"
import fastifyJwt from "@fastify/jwt"
import { verifyJwt } from "./middlewares/verifyJwt"
import { profileController } from "../controllers/users/profile"

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", registerController)
	
  app.register(fastifyJwt, {secret: process.env.JWT_SECRET})
  app.post("/sessions", loginController)

  // app.addHook("onRequest", verifyJwt)
  app.get("/:user_id", profileController)
}