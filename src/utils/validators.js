
const isEmpty = (string) => {
  return string.trim()=='' ? true : false

}

const isUndefined = (data) => {
  return data === undefined
}

const isEmptyString = (string) => {
  return string.trim()=='' ? true : false

}

const isEmail = (email) => {
  return true
}

module.exports = { isEmpty, isUndefined, isEmptyString, isEmail }
