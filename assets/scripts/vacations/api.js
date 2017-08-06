'use strict'

const config = require('../config')
const store = require('../store')

const createVacation = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'POST',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    },
    data,
  })
}

const getVacation = function () {
  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'GET',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    }
  })
}

const updateVacation = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/meals/' + data.meal.id,
    method: 'PATCH',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    },
    data,
  })
}

const removeVacation = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/meals/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  })
}

module.exports = {
  createVacation,
  getVacation,
  updateVacation,
  removeVacation
}
