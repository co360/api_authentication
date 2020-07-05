const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signUp = async (req, res, next) => {
  const { email, password } = req.value.body

  // Check if user already exists
  const foundUser = await User.findOne({ email })

  if (foundUser) {
    return res.status(403).json({
      success: false,
      error: 'User already exists'
    })
  }

  // Create new user
  const newUser = new User({ email, password })

  await newUser.save()

  // Generate token
  const token = signToken(newUser)

  //Respond with token
  res.status(201).json({
    success: true,
    message: 'User created',
    token
  })
}
exports.signIn = async (req, res, next) => {
  console.log('SignIn route reached')
  res.send('Signin working')
}
exports.secret = async (req, res, next) => {
  console.log('Secret route reached')
  res.send('secret working')
}

const signToken = (user) => {
  return jwt.sign(
    {
      iss: 'apiauth',
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    process.env.JWT_SECRET
  )
}