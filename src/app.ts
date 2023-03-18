import fastify from "fastify"

import { errorHandler } from "./http/controllers/_utils/errorHandler"

import { taskRoutes } from "./http/routes/tasks"
import { userRoutes } from "./http/routes/user"

export const app = fastify()

app.setErrorHandler(errorHandler)

app.register(userRoutes, {prefix: "/users"})
app.register(taskRoutes, {prefix: "/tasks"})
