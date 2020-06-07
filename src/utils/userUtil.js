const { isEmail, isEmpty } = require('./validators')

const validateSignupData = (data) => {
  let errors = {}

  if(isEmpty(data.email)) {
    errors.email = "Must not be empty"
  } else {
    if(!isEmail(data.email)) {
      errors.email = "Is not valid"
    }
  }

  if(isEmpty(data.password)) {
    errors.password = "Must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

const validateLoginData = (data) => {
  let errors = {}
  if(isEmpty(data.email)) {
    errors.email = "Must not be empty"
  } else {
    if(!isEmail(data.email)) {
      errors.email = "Is not valid"
    }
  }

  if(isEmpty(data.password)) {
    errors.password = "Must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

module.exports = { validateLoginData, validateSignupData }