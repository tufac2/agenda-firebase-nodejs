const { isUndefined } = require('./validators')

const validateArgCreateEvent = (data) => {
  let errors = {}
  if(isUndefined(data.dateFrom)) errors.dateFrom = "dateFrom must not be empty"
  if(isUndefined(data.dateTo)) errors.dateTo = "dateTo must not be empty"
  if(isUndefined(data.dateTo)) errors.dateTo = "userId must not be empty"
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

const validateUpdateEvent = (data, preventExtensions = true) => {
  let dummyEvent = {}
  let errors = {}
  if(isUndefined(data.id)){
    errors.id = "Event ID is not in the request"
  }else{
    if(!isUndefined(data.dateFrom)) dummyEvent.dateFrom = data.dateFrom
    if(!isUndefined(data.dateTo)) dummyEvent.dateTo = data.dateTo
    if(!isUndefined(data.description)) dummyEvent.description = data.description
    if(!isUndefined(data.title)) dummyEvent.title = data.title
  }

  if(preventExtensions) Object.preventExtensions(dummyEvent)
  
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
    dummyEvent
  }
}

const initializeEvent = (data) => {
  return {
    createdAt: new Date().toISOString(),
    dateFrom: new Date(data.dateFrom).toISOString(),
    dateTo: new Date(data.dateTo).toISOString(),
    description: data.description || null,
    title: data.title
  }
}

module.exports = { validateArgCreateEvent, validateUpdateEvent, initializeEvent }
