import ProfileModel from '../models/Profile.js'

export const getAll = async (req, res) => {
  try {
    const profiles = await ProfileModel.find().exec()

    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get profiles',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const profileId = req.params.id

    const profile = await ProfileModel.findById(profileId).exec()

    res.json(profile)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to get profile',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new ProfileModel({
      name: req.body.name,
    })

    const profile = await doc.save()

    res.json(profile)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to create profile',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const profileId = req.params.id

    ProfileModel.findOneAndDelete(
      {
        _id: profileId,
      },
      (err, doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Profile not found',
          })
        }

        res.json({
          success: true,
        })
      },
    )
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to delete profile',
    })
  }
}
