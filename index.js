import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { mongoDB } from './variables.js'
import { TodoController } from './controllers/index.js'
import { ProfileController } from './controllers/index.js'

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database error', err))

const app = express()

app.use(cors())
app.use(express.json())

app.get('/todos', TodoController.getAll)
app.post('/todos', TodoController.create)
app.get('/todos/:id', TodoController.getOne)
app.patch('/todos/:id', TodoController.update)
app.delete('/todos/:id', TodoController.remove)

app.get('/profiles', ProfileController.getAll)
app.post('/profiles', ProfileController.create)
app.get('/profiles/:id', ProfileController.getOne)
app.delete('/profiles/:id', ProfileController.remove)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
