import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

// HTTP Method: GET, POST, PUT, PATCH, DELETE
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    host: '::',
    port: 3333,
  })
  .then(() => {
    console.log('😎 HTTP server running on http://localhost:3333')
  })
