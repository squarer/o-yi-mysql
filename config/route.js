const beforeAction = require('../beforeAction/beforeAction.js')

const period = require('../controllers/period.js')

const route = {
  periods: [
    ['get', '/', period.find],
    ['get', '/:id', period.findOne],
    ['post', '/', period.create],
    ['put', '/:id', period.update],
    ['delete', '/:id', period.delete],
  ],
}


module.exports = function (app) {
  //beforeAction
  app.all('*', beforeAction.offSetAndLimit)
  app.all('*', beforeAction.removeInput)

  const express = require('express')
  for (const key in route) {
    const router = express.Router()
    const array = route[key]
    array.forEach(function (value) {
      if (value.length > 3) {
        for (let i = 3; i < value.length; i++) {
          if (typeof value[i] === 'function') {
            router[value[0]](value[1], value[i])
          }
        }
      }
      if (typeof value[2] === 'function') {
        router[value[0]](value[1], value[2])
      }
    })
    app.use('/' + key, router)
  }
}