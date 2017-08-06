'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const editVacationTemplate = require('../templates/meal-edit-form.handlebars')

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onCreateVacation = function (event) {
  let data = getFormFields(event.target)
  event.preventDefault()
  api.creatVacations(data)
    .then((response) => {
      store.vacation = response.vacation
      onGetVacations()
    })
    .then(ui.createMealSuccess)
    .catch(ui.createMealFailure)
}

const onGetVacation = function () {
  api.getVacations()
    .then((response) => {
      store.vacations = response.vacations
      ui.getVacationSuccess()
    })
    .catch(ui.getVacationFailure)
}

const onUpdateVacation = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  api.updateVacation(data)
    .then(ui.UpdateMealSuccess)
    .then(() => {
      onGetVacations()
      $('#editModal').modal('hide')
    })
    .catch(ui.UpdateVacationFailure)
}

const openEditModal = function (event) {
  event.preventDefault()
  let vacationId = $(this).data().vacationid
  let currentVacation = store.vacations.filter((vacation) => {
    return vacation.id === vacationId
  })[0]
  $('#editModal').modal('show')
  $('#editModal .container').html(editVacationTemplate({vacation: currentVacation}))
}

const onRemoveVacation = function (event) {
  let vacationId = $(this).data().vacationid
  event.preventDefault()
  api.removeVacation(vacationId)
    .then(ui.removeVacationSuccess)
    .then(onGetVacations)
    .catch(ui.removeVacaFailure)
}

const addHandlers = () => {
  $('#create-vacation').on('submit', onCreateVacation)
  $('#show-vacations').on('click', onGetVacations)
  $('.vacation-show').on('click', '.vacation-delete', onRemoveVacation)
  $('.vacation-show').on('click', '.vacation-edit', openEditModal)
  $('#editModal').on('submit', 'form.edit-vacation', onUpdateVacation)
}

module.exports = {
  addHandlers,
}
