import mongoose, { Document } from 'mongoose'

export interface Profile extends Document {
  name: string
}

const ProfileSchema = new mongoose.Schema<Profile>({
  name: {
    type: String,
    required: true,
  },
})

export default mongoose.model<Profile>('Profile', ProfileSchema)
