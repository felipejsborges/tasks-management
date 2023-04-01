import { FastifyPluginAsync } from "fastify"
import { createTaskController } from "../controllers/tasks/create"
import { getTaskController } from "../controllers/tasks/get"
import { listTasksController } from "../controllers/tasks/list"
import { updateTaskController } from "../controllers/tasks/update"
import { verifyJwt } from "./middlewares/verifyJwt"

export const taskRoutes: FastifyPluginAsync = async (app) => {
  // app.addHook("onRequest", verifyJwt)

  app.post("/", createTaskController)
  app.get("/:taskId", getTaskController)
  app.get("/", listTasksController)
  app.put("/:taskId", updateTaskController)
  // app.delete("/:task_id", deleteTaskController)
}