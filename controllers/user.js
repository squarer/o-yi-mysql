const User = require('../models').user
const helper = require('../helper/helper.js')

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
  }
}
