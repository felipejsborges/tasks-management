import { FastifyPluginAsync } from "fastify"
import fastifyJwt from "@fastify/jwt"

import { verifyJwt } from "./middlewares/verifyJwt"

import { registerController } from "../controllers/users/register"
import { loginController } from "../controllers/users/login"
import { profileController } from "../controllers/users/profile"
import { updateUserController } from "../controllers/users/update"

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", registerController)
	
  app.register(fastifyJwt, {secret: process.env.JWT_SECRET})
  app.post("/sessions", loginController)

  // app.addHook("onRequest", verifyJwt)
  app.get("/:user_id", profileController)
  app.put("/:user_id", updateUserController)
}