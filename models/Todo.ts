import mongoose, { Document } from 'mongoose'

import { Profile } from './Profile'

interface Todo extends Document {
  title: string
  description: string
  date: string
  done: boolean
  profile: Profile
  file: string
}

const TodoSchema = new mongoose.Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  file: String,
})

export default mongoose.model<Todo>('Todo', TodoSchema)
