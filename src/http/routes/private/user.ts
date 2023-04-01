import { profileController } from "@/http/controllers/users/profile"
import { updateUserController } from "@/http/controllers/users/update"
import { FastifyPluginAsync } from "fastify"

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.get("/:userId", profileController)
  app.put("/:userId", updateUserController)
}