import { FastifyPluginAsync } from "fastify"

import { createTaskController } from "@/http/controllers/tasks/create"
import { deleteTaskController } from "@/http/controllers/tasks/delete"
import { getTaskController } from "@/http/controllers/tasks/get"
import { listTasksController } from "@/http/controllers/tasks/list"
import { updateTaskController } from "@/http/controllers/tasks/update"

export const taskRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", createTaskController)
  app.get("/:taskId", getTaskController)
  app.get("/", listTasksController)
  app.put("/:taskId", updateTaskController)
  app.delete("/:taskId", deleteTaskController)
}
