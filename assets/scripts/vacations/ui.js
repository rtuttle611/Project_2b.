'use strict'

const store = require('../store')
const vacationTemplate = require('../templates/vacation-list.handlebars')

const createVacationSuccess = () => {
  $('#create-vacation')[0].reset()
  $('.alert-message').text('Pack your bags!!, New vacation created!')
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()
  $('input').val('')
}
const createVacationFailure = (err) => {
  if (err.status === 400) {
    $('.danger-alert-message').text('Something went wrong, please make sure all feilds and credentials are correct.')
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  } else {
    $('.danger-alert-message').text('An unknown error occured. Please try again.')
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()

  }
}

const getVacationSuccess = () => {
  // console.log(store.vacations);
  // const sortedVacations = store.vacations.sort(function (a, b) {
  //   return new Date(b.eaten_on) - new Date(a.eaten_on)
  // })

  const vacations = vacationTemplate({
    vacations: store.vacations
  })

  $('.vacation-display').html('')
  $('.vacation-display').append(vacations)
}

const updateVacationSuccess = () => {
  $('#editModal').modal('hide')
  $('.alert-message').text('Vacation Edited!')
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()
  $('input').val('')
}

const removeVacationSuccess = () => {
  $('#delete-vacation').val('')
  $('.alert-message').text('Vacation Removed!')
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()
  $('input').val('')
}
const removeVacationFailure = () => {
  $('.danger-alert-message').text('Oh NO!!, Somthing went wrong! Please try again!')
  $('.alert-danger').slideDown()

  $('.alert-danger').delay(2000).slideUp()
}

module.exports = {
  createVacationSuccess,
  createVacationFailure,
  getVacationSuccess,
  updateVacationSuccess,
  removeVacationSuccess,
  removeVacationFailure
}
