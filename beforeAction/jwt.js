const config = require('../config/config.json')
const jwt = require('jwt-simple')

module.exports = {
  verify: function (req, res, next) {
    if (!req.headers['x-access-token']) {
      return res.status(401).send({
        message: 'JWT token is require'
      })
    } else {
      const token = req.headers['x-access-token']

      try {
        const decoded = jwt.decode(token, config.secret)
        if (new Date(decoded.expireAt) < new Date()) {
          return res.status(401).send({
            message: 'JWT token is expired'
          })
        }
        req.body.userId = decoded.userId
        next()
      } catch (err) {
        return res.status(400).send({
          message: `JWT token ${err.message}`
        })
      }
    }
  },
}
