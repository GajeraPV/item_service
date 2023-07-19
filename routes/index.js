'use strict'

const itemsRoutes = require('./items')

module.exports = function (app) {
  app.use('/api/v1', itemsRoutes)
}