import { FastifyPluginAsync } from "fastify"
import { verifyJwt } from "./middlewares/verifyJwt"

export const taskRoutes: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", verifyJwt)
}