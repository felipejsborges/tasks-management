import { FastifyPluginAsync } from "fastify"

import { registerController } from "@/http/controllers/users/register"
import { loginController } from "@/http/controllers/users/login"

export const publicRoutes: FastifyPluginAsync = async (app) => {
  app.post("/users", registerController)
  app.post("/sessions", loginController)
}
