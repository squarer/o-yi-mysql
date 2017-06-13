const UserGroup = require('../models').user_group;
const helper = require('../helper/helper.js')

module.exports = {
    find: async (req, res) => {
        try {
            const result = await UserGroup.findAll()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }

    },
    findOne: async (req, res) => {
        try {
            const result = await UserGroup.findOne({ where: { id: req.params.id } })

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }

    },
    create: async (req, res) => {
        try {
            let result = await UserGroup.create({
                name: req.body.name
            })
            result = await UserGroup.findOne({ where: { id: result.id } })

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    update: async (req, res) => {
        try {
            let result = await UserGroup.update({
                name: req.body.name
            }, { where: { id: req.params.id } })
            result = await UserGroup.findOne({ where: { id: req.params.id } })

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    delete: async (req, res) => {
        try {
            const result = await UserGroup.destroy({ where: { id: req.params.id } })

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
