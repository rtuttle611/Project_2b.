'use strict'

const config = require('../config')
const store = require('../store')

const createVacation = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/vacations',
    method: 'POST',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    },
    data,
  })
}

const getVacations = function () {
  return $.ajax({
    url: config.apiOrigin + '/vacations',
    method: 'GET',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    }
  })
}

const updateVacation = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/vacations/' + data.vacation.id,
    method: 'PATCH',
    headers: {
      "Authorization": `Token token=${store.user.token}`
    },
    data,
  })
}

const removeVacation = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/vacations/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  })
}

module.exports = {
  createVacation,
  getVacations,
  updateVacation,
  removeVacation
}
