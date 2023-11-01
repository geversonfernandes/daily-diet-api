import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.post<{ Params: { user_id: string } }>(
    '/meals/:user_id',
    async (request, reply) => {
      const newMealsSchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.boolean(),
      })

      const { name, description, isDiet } = newMealsSchema.parse(request.body)

      const userId = request.params.user_id

      console.log(userId)

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        isDiet,
        user_id: userId,
      })

      return reply.status(201).send(`Refeição ${name} criada com sucesso`)
    },
  )
}
