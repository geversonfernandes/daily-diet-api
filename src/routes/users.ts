import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const newUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = newUserSchema.parse(request.body)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
    })

    return reply.status(201).send(`Usuário ${name} criado com sucesso`)
  })

  app.get<{ Params: { user_id: string; meal_id: string } }>(
    '/users/:user_id',
    async (request, reply) => {
      const userId = request.params.user_id

      const meals = await knex('meals')
        .where('user_id', userId)
        .count('* as total')

      const totalMeals = meals[0].total

      const diet = await knex('meals')
        .where('user_id', userId)
        .andWhere('isDiet', true)
        .count('* as totalDiet')

      const totalDiet = diet[0].totalDiet

      const notDiet = await knex('meals')
        .where('user_id', userId)
        .andWhere('isDiet', false)
        .count('* as totalNotDiet')

      const totalNotDiet = notDiet[0].totalNotDiet

      return reply.status(200).send({ totalMeals, totalDiet, totalNotDiet })
    },
  )
}
