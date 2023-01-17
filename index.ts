import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

import { TodoController } from './controllers'
import { ProfileController } from './controllers'

mongoose
  .connect(process.env.MONGODB as string)
  .then(() => console.log('Database OK'))
  .catch((err: Error) => console.log('Database error', err))

const app: Application = express()

app.use(cors())
app.use(express.json())

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (_: Express.Request, __: Express.Multer.File, cb: DestinationCallback): void => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },

  filename: (_: Express.Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  })
})

app.get('/todos', TodoController.getAll)
app.post('/todos', TodoController.create)
app.get('/todos/:id', TodoController.getOne)
app.get('/todos/profile/:id', TodoController.getProfileTodos)
app.patch('/todos/:id', TodoController.update)
app.delete('/todos/:id', TodoController.remove)

app.get('/profiles', ProfileController.getAll)
app.post('/profiles', ProfileController.create)
app.delete('/profiles/:id', ProfileController.remove)

app.listen(process.env.PORT || 4444, () => {
  console.log('Server OK')
})
