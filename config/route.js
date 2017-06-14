const beforeAction = require('../beforeAction/beforeAction.js')
const jwt = require('../beforeAction/jwt.js')
const path = require('path')
const period = require('../controllers/period.js')
const userGroup = require('../controllers/userGroup.js')
const user = require('../controllers/user.js')

const route = {
  periods: [
    ['get', '/', period.find],
    ['get', '/:id', period.findOne],
    ['post', '/', period.create],
    ['put', '/:id', period.update],
    ['delete', '/:id', period.delete],
  ],
  userGroup: [
    ['get', '/', userGroup.find],
    ['get', '/:id', userGroup.findOne],
    ['post', '/', userGroup.create],
    ['put', '/:id', userGroup.update],
    ['delete', '/:id', userGroup.delete],
  ],
  user: [
    ['get', '/', user.find],
    ['get', '/:id', user.findOne],
    ['post', '/', user.create],
    ['put', '/:id', user.update],
    ['delete', '/:id', user.delete],
    ['post', '/signIn', user.login],
  ],
  token: [
    ['get', '/verify', user.verify, jwt.verify]
  ]
}


module.exports = function(app) {
  //beforeAction
  app.all('*', beforeAction.offSetAndLimit)
  app.all('*', beforeAction.removeInput)

  const express = require('express')
  for (const key in route) {
    const router = express.Router()
    const array = route[key]
    array.forEach(function(value) {
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

  app.get('/socket_playground', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'socket_playground.html'))
  })

  app.get('/', function(req, res) {
    res.render('index')
  })
}
