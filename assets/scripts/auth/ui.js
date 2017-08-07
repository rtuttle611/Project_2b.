'use strict'
const store = require('../store')

const checkForUser = function() {
  // console.log('checkForUser');
  //if user is already signed in
  if (store.user) {
    // console.log('store.user: ', store.user);
    loggedInSuccess()

    $('#sign-in').hide()
    $('#sign-out').show()
    $('#change-password').show()
    $('#logbox2').show()
    $('#show-vacations').show()
    $('#create-vacation-button').show()
    $('#delete-vacation-button').show()
    $('#update-vacation-button').show()
    $('.welcome').hide()
  } else {
    $('#sign-out').hide()
    $('#change-password').hide()
    $('#sign-in').show()
    $('#logbox2').hide()
    $('#show-vacations').hide()
    $('#create-vacation-button').hide()
    $('#delete-vacation-button').hide()
    $('#update-vacation-button').hide()
    $('.welcome').show()
  }
}

const signUpFailure = (err) => {
  if (err.status === 400) {
    //unauthorized
    $('.danger-alert-message').text("Something went wrong. Check your credentials entered.")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  } else {
    $('.danger-alert-message').text("An unknown error occured.")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()

  }
}

const signUpSuccess = (resp) => {
  // console.log('signUpSuccess');
  $("#sign-up")[0].reset()
  $('#logbox').hide()
  $('.alert-message').text("Thanks for signing up! Please sign in!")
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()
  $('input').val('')
}

const signInSuccess = (resp) => {
  // console.log('signInSuccess');
  store.user = resp.user
  window.localStorage.setItem('user', JSON.stringify(resp.user))
  loggedInSuccess()
  $('.alert-message').text('You have signed is as ' + resp.user.email)
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()


  checkForUser()
  $('input').val('')
  return store.user
}


const loggedInSuccess = () => {
  $("#sign-in")[0].reset()
  $('#signIn').hide()
  $('#logbox').hide()
  $('.vacation-show').show()
  $('input').val('')
}

const signOutSuccess = () => {
  // console.log('signOutSuccess');
  $('#logbox').show()
  $('#lobbox2').hide()
  $('.vacation-display').html('')


  store.user = undefined
  // remove local storage user copy.
  window.localStorage.removeItem('user')
  checkForUser()
  return store
  $('input').val('')
}

const signOutFailure = () => {
  $('#logbox').show()
  $('#lobbox2').hide()
  $('.vacation-show').html('')

  store.user = {}
  window.localStorage.removeItem('user')
  checkForUser()
  return store
}


const signInFailure = (err) => {
  if (err.status === 401) {
    $('.danger-alert-message').text("Wrong username or password! Try again")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  } else {
    $('.danger-alert-message').text("An unknown error occured.")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  }
}

const passwordChangeFailure = (err) => {
  if (err.status === 400) {
    $('.danger-alert-message').text("Your existing password is incorect")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  } else {
    $('.danger-alert-message').text("An unknown error occured.")
    $('.alert-danger').slideDown()

    $('.alert-danger').delay(2000).slideUp()
  }
}

const passwordChangeSuccess = () => {
  $("#change-password")[0].reset()
  $('.alert-message').text('You have sucessfully changed your password!')
  $('.alert-success').slideDown()

  $('.alert-success').delay(2000).slideUp()
  $('input').val('')
}


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  passwordChangeFailure,
  passwordChangeSuccess,
  signOutSuccess,
  signOutFailure,
  loggedInSuccess,
  checkForUser
}
