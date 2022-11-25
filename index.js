import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

import { TodoController } from './controllers/index.js'
import { ProfileController } from './controllers/index.js'

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database error', err))

const app = express()

app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
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

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
