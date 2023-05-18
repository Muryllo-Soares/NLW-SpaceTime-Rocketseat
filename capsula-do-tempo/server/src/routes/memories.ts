import { FastifyInstance } from 'fastify'
import {z} from "zod"
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
   const memories = await prisma.memory.findMany({
    orderBy:{
        createdAt: 'asc',
    }
   }),

   return memories.map(memory => {
    return{
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat(...)
    }
   })
  })

  app.get('/memories/:id', async (request) => {
   const paramsSchema = z.object({
    id: z.string().uuid(),
   })

   const {id} = paramsSchema.parse(request.params)

   const memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return memory

  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string().uuid(),
      coverUrl: z.string(),
      isPlublic: z.coerce.boolean().default(false),
     })

    const { content, coverUrl, isPlublic} = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPlublic,
        userId: '0d9e1ddb-fcd4-47ee-b726-7db179e3cd2b'
      },
    })
    
    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
     })
     const {id} = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string().uuid(),
      coverUrl: z.string(),
      isPlublic: z.coerce.boolean().default(false),
     })

    const { content, coverUrl, isPlublic} = bodySchema.parse(request.body)

    const memory = await.prisma.memory.update({
      where:{
        id,
      },
      data:{
        content, 
        coverUrl, 
        isPlublic,
      }
    })

    return memory
    
   
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
     })
  
     const {id} = paramsSchema.parse(request.params)
  
    await prisma.memory.delete({
      where: {
        id,
      },
    })
  

   
  })
}
