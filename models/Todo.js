import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
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

export default mongoose.model('Todo', TodoSchema)
