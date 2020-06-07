const password = require('secure-random-password')

const randomPassword = password.randomPassword({ characters: password.lower + password.upper + password.digits })

module.exports = { randomPassword }