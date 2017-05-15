const Period  = require('../models').period;
const helper = require('../helper/helper.js')

module.exports = {
  find: async (req, res) => {
    try {
      const result = await Period.findAll()

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }

  },
  findOne: async (req, res) => {
    try {
      const result = await Period.findOne({ where: { id: req.params.id } })

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }

  },
  create: async (req, res) => {
    try {
      let result = await Period.create({
        result: req.body.result
      })
      result = await Period.findOne({ where: { id: result.id } })

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }
  },
  update: async (req, res) => {
    try {
      let result = await Period.update({
        result: req.body.result
      }, { where: { id: req.params.id } })
      result = await Period.findOne({ where: { id: req.params.id } })

      return res.send(result)
    } catch (err) {
      return helper.err(err, res)
    }
  },
  delete: async (req, res) => {
    try {
      const result = await Period.destroy({ where: { id: req.params.id } })

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