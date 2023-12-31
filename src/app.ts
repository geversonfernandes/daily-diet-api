import fastify from 'fastify'

import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

export const app = fastify()

app.register(usersRoutes)
app.register(mealsRoutes)
