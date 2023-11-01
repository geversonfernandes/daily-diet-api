import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { stringify } from 'querystring'

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

  app.patch<{ Params: { user_id: string; meal_id: string } }>(
    '/meals/:user_id/:meal_id',
    async (request, reply) => {
      const newMealsSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        isDiet: z.boolean().optional(),
      })

      const data = newMealsSchema.parse(request.body)

      const userId = request.params.user_id
      const mealId = request.params.meal_id

      await knex('meals')
        .update(data)
        .where('user_id', userId)
        .andWhere('id', mealId)

      return reply.status(200).send(`Refeição alterada com sucesso`)
    },
  )

  app.delete<{ Params: { user_id: string; meal_id: string } }>(
    '/meals/:user_id/:meal_id',
    async (request, reply) => {
      const userId = request.params.user_id
      const mealId = request.params.meal_id

      const deletedCount = await knex('meals')
        .where('user_id', userId)
        .andWhere('id', mealId)
        .del()

      if (deletedCount === 1) {
        return reply.status(200).send(`Refeição deletada com sucesso`)
      } else {
        return reply
          .status(404)
          .send(`Refeição não encontrada ou já foi deletada`)
      }
    },
  )

  app.get<{ Params: { user_id: string } }>(
    '/meals/:user_id',
    async (request, reply) => {
      const userId = request.params.user_id

      const datas = await knex('meals').select('*').where('user_id', userId)

      return reply.status(200).send(datas)
    },
  )
}
