
import { FastifyPluginAsync } from "fastify"
import { verifyJwt } from "../middlewares/verifyJwt"
import { taskRoutes } from "./tasks"
import { userRoutes } from "./user"

export const privateRoutes: FastifyPluginAsync = async (app) => {
  app.addHook("preHandler", verifyJwt)

  app.register(userRoutes, { prefix: "/users" })
  app.register(taskRoutes, { prefix: "/tasks" })
}
