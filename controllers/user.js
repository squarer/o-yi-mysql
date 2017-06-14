const User = require('../models').user
const helper = require('../helper/helper.js')
const jwt = require('jwt-simple')
const config = require('../config/config.json')

module.exports = {
  find: async(req, res) => {
    try {
      const result = await User.findAll()

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }

  },
  findOne: async(req, res) => {
    try {
      const result = await User.findOne({ where: { id: req.params.id }})

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }

  },
  create: async(req, res) => {
    try {
      let result = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_group: req.body.user_group,
      })
      result = await User.findOne({ where: { id: result.id }})

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }
  },
  update: async(req, res) => {
    try {
      let result = await User.update(req.body, { where: { id: req.params.id }, individualHooks: true })
      result = await User.findOne({ where: { id: req.params.id }})

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }
  },
  delete: async(req, res) => {
    try {
      const result = await User.destroy({ where: { id: req.params.id }})

      if (result) {
        return res.send({ message: `delete id:${req.params.id} success` })
      } else {
        return res.send({ message: `id:${req.params.id} is not exists` })
      }
    } catch (err) {
      return helper.err(err, res)
    }
  },
  login: async(req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email }})
      if (!user) {
        return res.status(404).send({ message: 'user not exist' })
      }

      if (!user.passwordVerify(req.body.password)) {
        return res.status(401).send({ message: 'password not match' })
      }

      const expireAt = new Date()
      expireAt.setDate(expireAt.getDate() + 1)
      const token = jwt.encode({
        userId: user.id,
        expireAt: expireAt
      }, config.secret)
      res.header('x-access-token', token)

      return res.send(user)
    } catch (err) {
      return helper.err(err, res)
    }
  }
}
